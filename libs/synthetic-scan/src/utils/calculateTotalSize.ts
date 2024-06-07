import {request} from "playwright";
import { NetworkRequest } from '../synthetic-scan.service';

type CalculateTotalSizeOptions = {
    omitCached: boolean
}

const defaultOptions = {
    omitCached: false
}

export const calculateTotalSize = async (
    networkRequests: NetworkRequest[]
) => {
    let totalSize = 0;

    for (const networkRequest of networkRequests) {
        if (networkRequest.request.url().includes('nsvcs')) {
            console.log(networkRequest.request);
            continue;
        }

        if (!networkRequest.request.failure()) {

            const sizes = await networkRequest.request.sizes();
            const responseBodySize = sizes.responseBodySize;
            const requestBodySize = sizes.requestBodySize;

            if (responseBodySize > 0) {
                totalSize += responseBodySize + requestBodySize;
            }

        }

        // if (response) {
        //
        //     const headers = response.headers();
        //     const contentLength = headers['content-length'];
        //
        //     if (contentLength) {
        //         const size = parseInt(contentLength);
        //         totalSize += size
        //     } else {
        //         try {
        //             const body = await response.;
        //             totalSize += body.length;
        //         } catch (e) {
        //             console.log(e, networkRequest.response);
        //         }
        //     }
        //
        // } else {
        //     console.log(networkRequest.url, 'no response')
        // }
    }

    return totalSize;
}
