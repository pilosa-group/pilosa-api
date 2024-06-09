(() => {
    const BEACON_API_URL = SNIPPET_API_ENDPOINT;
    const ENTRY_TYPE_RESOURCE = 'resource';
    let payloads = [];
    const noop = () => { };
    const CLIENT_ID = document.currentScript.getAttribute('data-client-id');
    const debounce = (fn, wait) => {
        let timeout;
        return () => {
            clearTimeout(timeout);
            timeout = window.setTimeout(fn, wait);
        };
    };
    let firstPageLoad = true;
    const colorScheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'd'
        : 'l';
    const sendBeacon = () => {
        const groupedPayloads = {
            f: firstPageLoad,
            m: colorScheme,
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
            if (!groupedPayloads.d[domain]) {
                groupedPayloads.d[domain] = {};
            }
            if (!groupedPayloads.d[domain][path]) {
                groupedPayloads.d[domain][path] = {};
            }
            if (!groupedPayloads.d[domain][path][initiatorType]) {
                groupedPayloads.d[domain][path][initiatorType] = {};
            }
            if (!groupedPayloads.d[domain][path][initiatorType][extension]) {
                groupedPayloads.d[domain][path][initiatorType][extension] = {
                    b: [0, 0],
                    co: [],
                };
            }
            groupedPayloads.d[domain][path][initiatorType][extension].b[compressed ? compressedKey : uncompressedKey] += bytes;
            for (const origin of crossOrigin) {
                if (!groupedPayloads.d[domain][path][initiatorType][extension].co.includes(origin)) {
                    groupedPayloads.d[domain][path][initiatorType][extension].co.push(origin);
                }
            }
            groupedPayloads.b[compressed ? compressedKey : uncompressedKey] += bytes;
        }
        const hasBytes = groupedPayloads.b.some((bytes) => bytes > 0);
        const hasData = Object.keys(groupedPayloads.d).length > 0;
        if (hasBytes || hasData) {
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
        payloads = [];
        firstPageLoad = false;
    };
    document.addEventListener('visibilitychange', () => {
        sendBeacon();
    });
    const sendBeaconDebounced = debounce(sendBeacon, BATCH_REPORT_WAIT_TIME_IN_MS);
    const observer = new PerformanceObserver((list) => {
        list.getEntries().map((entry) => {
            const domain = window.location.hostname;
            const path = window.location.pathname + window.location.search;
            switch (entry.entryType) {
                case ENTRY_TYPE_RESOURCE: {
                    const cached = entry.transferSize === 0 && entry.decodedBodySize > 0;
                    if (cached) {
                        return;
                    }
                    const url = new URL(entry.name);
                    const compressed = entry.decodedBodySize &&
                        entry.decodedBodySize !== entry.encodedBodySize;
                    let extension = '_';
                    if (url.pathname.includes('.')) {
                        extension = url.pathname.split('.').pop();
                    }
                    const payload = {
                        domain,
                        path,
                        compressed,
                        initiatorType: entry.initiatorType,
                        bytes: entry.transferSize,
                        crossOrigin: [],
                        extension,
                    };
                    if (entry.transferSize === 300 && entry.initiatorType === 'fetch') {
                        return;
                    }
                    if (entry.transferSize === 0) {
                        const origin = url.host;
                        if (!payload.crossOrigin.includes(origin)) {
                            payload.crossOrigin.push(origin);
                        }
                    }
                    if (payload.initiatorType === 'fetch' &&
                        payload.crossOrigin.length === 1 &&
                        BEACON_API_URL.includes(payload.crossOrigin[0])) {
                        return;
                    }
                    payloads.push(payload);
                    break;
                }
            }
        });
        if (payloads.length > 0) {
            sendBeaconDebounced();
        }
    });
    observer.observe({ type: ENTRY_TYPE_RESOURCE, buffered: true });
})();
//# sourceMappingURL=web-snippet-injectable.js.map