import {
  BeaconPayloadDto,
  CrossOriginDomain,
  Domain,
  FileExtension,
  InitiatorType,
  IsCompressed,
  NumberOfBytes,
  PageLoaded,
  Path,
} from '@app/web-metrics/dto/beacon-payload.dto';

type Payload = {
  // The current bytes of the resource
  b: NumberOfBytes;
  // Whether the resource is compressed
  c: IsCompressed;
  // The cross-origin origins of the resource, when it's a cross-origin request
  co: CrossOriginDomain[];
  // The domain of the resource
  d: Domain;
  // extension
  e: FileExtension;
  // The type of the initiator of the resource
  it: InitiatorType;
  // Whether the document has reached "load" state
  l: PageLoaded;
  // The path of the resource
  p: Path;
};

declare let SNIPPET_API_ENDPOINT: string;
declare let BATCH_REPORT_WAIT_TIME_IN_MS: number;

const BEACON_API_URL = SNIPPET_API_ENDPOINT;
const ENTRY_TYPE_RESOURCE = 'resource';

let payloads: Payload[] = [];

const w = window;
const d = document;
const noop = () => {};
const isNumber = (value: unknown): value is number => typeof value === 'number';
const CLIENT_ID = d.currentScript.getAttribute('data-client-id');

/**
 * Debounce function
 *
 * @param fn
 * @param wait
 */
const debounce = (fn: () => void, wait: number) => {
  let timeout: number | undefined;

  return () => {
    clearTimeout(timeout);
    timeout = w.setTimeout(fn, wait);
  };
};

// whether this was the first page load
let pageLoaded = false;

w.addEventListener('load', () => {
  pageLoaded = true;
});

d.addEventListener('visibilitychange', () => {
  sendBeacon();
});

const colorScheme = w.matchMedia('(prefers-color-scheme: dark)').matches
  ? 'd'
  : 'l';

const compressedKey = 0;
const uncompressedKey = 1;
const isSupported = !!(w.PerformanceObserver && w.PerformanceResourceTiming);

const sendBeacon = (): void => {
  const groupedPayloads: BeaconPayloadDto = {
    b: [0, 0],
    d: {},
    m: colorScheme,
    v: [w.innerWidth, w.innerHeight],
  };

  for (const payload of payloads) {
    const pageLoaded = payload.l;
    const domain = payload.d;
    const path = payload.p;
    const initiatorType = payload.it;
    const extension = payload.e;
    const compressed = payload.c;
    const bytes = payload.b;
    const crossOrigin = payload.co;

    // If the domain doesn't exist in the groupedPayloads, add it
    if (!groupedPayloads.d[domain]) {
      groupedPayloads.d[domain] = {};
    }

    // If the path doesn't exist in the groupedPayloads, add it
    if (!groupedPayloads.d[domain][path]) {
      groupedPayloads.d[domain][path] = {};
    }

    // If the initiatorType doesn't exist in the groupedPayloads, add it
    if (!groupedPayloads.d[domain][path][initiatorType]) {
      groupedPayloads.d[domain][path][initiatorType] = {};
    }

    // If the extension doesn't exist in the groupedPayloads, add it
    if (!groupedPayloads.d[domain][path][initiatorType][extension]) {
      groupedPayloads.d[domain][path][initiatorType][extension] = {
        b: [0, 0],
        co: [],
        l: pageLoaded,
      };
    }

    // Add the bytes to the groupedPayloads
    groupedPayloads.d[domain][path][initiatorType][extension].b[
      compressed ? compressedKey : uncompressedKey
    ] += bytes;

    // Add the cross-origin origins to the groupedPayloads
    for (const origin of crossOrigin) {
      if (
        !groupedPayloads.d[domain][path][initiatorType][extension].co.includes(
          origin,
        )
      ) {
        groupedPayloads.d[domain][path][initiatorType][extension].co.push(
          origin,
        );
      }
    }

    // Add the bytes to the total bytes
    groupedPayloads.b[compressed ? compressedKey : uncompressedKey] += bytes;
  }

  const hasBytes = groupedPayloads.b.some((bytes) => bytes > 0);
  const hasData = Object.keys(groupedPayloads.d).length > 0;

  if (hasBytes || hasData) {
    fetch(BEACON_API_URL, {
      body: JSON.stringify(groupedPayloads),
      headers: {
        'Content-Type': 'application/json',
        'x-id': CLIENT_ID,
      },
      keepalive: true,
      method: 'POST',
    }).catch(noop);
  }

  // reset for next batch
  payloads = [];
};

// Send the beacon after a certain amount of time
const sendBeaconDebounced = debounce(sendBeacon, BATCH_REPORT_WAIT_TIME_IN_MS);

if (isSupported) {
  const observer = new PerformanceObserver((list) => {
    list.getEntries().map((entry: PerformanceResourceTiming) => {
      const { hostname: domain, pathname: path } = w.location;

      const {
        decodedBodySize,
        encodedBodySize,
        entryType,
        initiatorType,
        name,
        transferSize,
      } = entry;

      const hasValidPerformanceTimingValues = [
        decodedBodySize,
        encodedBodySize,
        transferSize,
      ].every(isNumber);

      // on some occasions these values can be undefined, for example in iOS 16.3 and lower
      if (!hasValidPerformanceTimingValues) {
        observer.disconnect();
        // @TODO also track non-supported entries, so we can determine number of visits and still make an estimate
        return;
      }

      switch (entryType) {
        case ENTRY_TYPE_RESOURCE: {
          const cached = transferSize === 0 && decodedBodySize > 0;

          if (cached) {
            return;
          }

          const { host, pathname } = new URL(name);

          // Check if the resource is compressed
          const compressed = decodedBodySize !== encodedBodySize;

          let extension = '_';
          if (pathname.includes('.')) {
            extension = pathname.split('.').pop();
          }

          const payload: Payload = {
            b: transferSize,
            c: compressed,
            co: [],
            d: domain,
            e: extension,
            it: initiatorType,
            l: pageLoaded,
            p: path,
          };

          // Cached page when EXACTLY 300 bytes?
          if (transferSize === 300 && initiatorType === 'fetch') {
            return;
          }

          // If the transfer size is 0, it's a cross-origin request
          if (transferSize === 0) {
            const origin = host;

            // Only add the origin if it's not already in the list
            if (!payload.co.includes(origin)) {
              payload.co.push(origin);
            }
          }

          // If the initiator type is fetch, and it's a call to the snippet API, ignore it
          if (
            payload.it === 'fetch' &&
            payload.co.length === 1 &&
            BEACON_API_URL.includes(payload.co[0])
          ) {
            return;
          }

          payloads.push(payload);

          break;
        }
      }
    });

    // If there are payloads, send the beacon
    if (payloads.length > 0) {
      sendBeaconDebounced();
    }
  });

  observer.observe({ buffered: true, type: ENTRY_TYPE_RESOURCE });
}
