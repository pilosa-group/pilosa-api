type FirstPageLoad = boolean;
type Timestamp = number;
type InitiatorType = string;
type Domain = string;
type Path = string;
type Origin = string;
type NumberOfBytes = number;
type FileExtension = string;
type CompressedBytes = NumberOfBytes;
type UncompressedBytes = NumberOfBytes;

type Payload = {
  // The domain of the resource
  domain: Domain;
  // The path of the resource
  path: Path;
  // The type of the initiator of the resource
  initiatorType: InitiatorType;
  // Whether the resource is compressed
  compressed: boolean;
  // The current bytes of the resource
  bytes: NumberOfBytes;
  // The cross-origin origins of the resource, when it's a cross-origin request
  crossOrigin: string[];
  // extension
  extension: FileExtension;
};

type CombinedPayload = {
  f: FirstPageLoad;
  t: Timestamp;
  b: [CompressedBytes, UncompressedBytes];
  d: {
    [key: Domain]: {
      [key: Path]: {
        [key: InitiatorType]: {
          [key: FileExtension]: {
            b: [CompressedBytes, UncompressedBytes];
            co: Origin[];
          };
        };
      };
    };
  };
};

// These vars are injected by the endpoint
declare let SNIPPET_API_ENDPOINT: string;
declare let BATCH_REPORT_WAIT_TIME_IN_MS: number;

(() => {
  const BEACON_API_URL = SNIPPET_API_ENDPOINT;
  const ENTRY_TYPE_RESOURCE = 'resource';

  let payloads: Payload[] = [];

  const noop = () => {};
  const CLIENT_ID = document.currentScript.getAttribute('data-client-id');

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
      timeout = window.setTimeout(fn, wait);
    };
  };

  // whether this was the first page load
  let firstPageLoad = true;

  const sendBeacon = (): void => {
    const groupedPayloads: CombinedPayload = {
      f: firstPageLoad,
      t: Date.now(),
      b: [0, 0],
      d: {},
    };

    const compressedKey = 0;
    const uncompressedKey = 1;

    for (const payload of payloads) {
      const domain = payload.domain;
      const path = payload.path;
      const initiatorType = payload.initiatorType;
      const extension = payload.extension;
      const compressed = payload.compressed;
      const bytes = payload.bytes;
      const crossOrigin = payload.crossOrigin;

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
        };
      }

      // Add the bytes to the groupedPayloads
      groupedPayloads.d[domain][path][initiatorType][extension].b[
        compressed ? compressedKey : uncompressedKey
      ] += bytes;

      // Add the cross-origin origins to the groupedPayloads
      for (const origin of crossOrigin) {
        if (
          !groupedPayloads.d[domain][path][initiatorType][
            extension
          ].co.includes(origin)
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
      // console.log(groupedPayloads);
      fetch(BEACON_API_URL, {
        keepalive: true,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-id': CLIENT_ID,
        },
        body: JSON.stringify(groupedPayloads),
      }).catch(noop);
    }

    // reset for next batch
    payloads = [];
    firstPageLoad = false;
  };

  document.addEventListener('visibilitychange', () => {
    sendBeacon();
  });

  // Send the beacon after a certain amount of time
  const sendBeaconDebounced = debounce(
    sendBeacon,
    BATCH_REPORT_WAIT_TIME_IN_MS,
  );

  const observer = new PerformanceObserver((list) => {
    list.getEntries().map((entry: PerformanceResourceTiming) => {
      const domain = window.location.hostname;
      const path = window.location.pathname + window.location.search;

      switch (entry.entryType) {
        case ENTRY_TYPE_RESOURCE: {
          const cached = entry.transferSize === 0 && entry.decodedBodySize > 0;

          if (cached) {
            return;
          }

          const url = new URL(entry.name);

          // Check if the resource is compressed
          const compressed =
            entry.decodedBodySize &&
            entry.decodedBodySize !== entry.encodedBodySize;

          let extension = '_';
          if (url.pathname.includes('.')) {
            extension = url.pathname.split('.').pop();
          }

          const payload: Payload = {
            domain,
            path,
            compressed,
            initiatorType: entry.initiatorType,
            bytes: entry.transferSize,
            crossOrigin: [],
            extension,
          };

          // Cached page when EXACTLY 300 bytes?
          if (entry.transferSize === 300 && entry.initiatorType === 'fetch') {
            return;
          }

          // If the transfer size is 0, it's a cross-origin request
          if (entry.transferSize === 0) {
            const origin = url.host;

            // Only add the origin if it's not already in the list
            if (!payload.crossOrigin.includes(origin)) {
              payload.crossOrigin.push(origin);
            }
          }

          // If the initiator type is fetch, and it's a call to the snippet API, ignore it
          if (
            payload.initiatorType === 'fetch' &&
            payload.crossOrigin.length === 1 &&
            BEACON_API_URL.includes(payload.crossOrigin[0])
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

  observer.observe({ type: ENTRY_TYPE_RESOURCE, buffered: true });
})();
