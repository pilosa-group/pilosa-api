let currentBytes = 0;
let currentBytesCached = 0;
let totalNumberOfEntries = 0;
let numberOfEntriesWithBodySize = 0;
const ENTRY_TYPE_RESOURCE = 'resource';

// These vars are injected by the endpoint
declare let SNIPPET_API_ENDPOINT: string;
declare let BATCH_REPORT_WAIT_TIME_IN_MS: number;

const TYPE_RESOURCE = 'r';
const noop = () => {};

const CLIENT_ID = document.currentScript.getAttribute('data-client-id');

let timeout: number | undefined;

const sendReport = () => {
  if (timeout) {
    clearTimeout(timeout);
  }

  timeout = window.setTimeout(() => {
    // TODO: accuracy based on the number of entries with body size
    const accuracy = (numberOfEntriesWithBodySize / totalNumberOfEntries) * 100;

    const domain = window.location.hostname;
    const path = window.location.pathname + window.location.search;

    const payload = {
      t: TYPE_RESOURCE,
      b: currentBytes,
      bc: currentBytesCached,
      d: domain,
      p: path,
      a: accuracy,
    };

    clearTimeout(timeout);

    fetch(SNIPPET_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-id': CLIENT_ID,
      },
      body: JSON.stringify(payload),
    }).catch(noop);

    // reset for next batch
    currentBytes = 0;
    currentBytesCached = 0;
    numberOfEntriesWithBodySize = 0;
    totalNumberOfEntries = 0;
  }, BATCH_REPORT_WAIT_TIME_IN_MS);
};

const observer = new PerformanceObserver((list) => {
  list.getEntries().map((entry: PerformanceResourceTiming) => {
    switch (entry.entryType) {
      case ENTRY_TYPE_RESOURCE: {
        currentBytes += entry.transferSize;
        currentBytesCached += entry.encodedBodySize;

        if (entry.encodedBodySize > 0) {
          numberOfEntriesWithBodySize++;
        }

        totalNumberOfEntries++;
        break;
      }
    }
  });

  console.log(currentBytes);

  if (currentBytes > 0) {
    sendReport();
  }
});

observer.observe({ type: ENTRY_TYPE_RESOURCE, buffered: true });
