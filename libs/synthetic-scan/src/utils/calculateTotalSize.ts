import { NetworkRequest } from '../synthetic-scan.service';

export const calculateTotalSize = async (networkRequests: NetworkRequest[]) => {
  let totalSize = 0;

  for (const networkRequest of networkRequests) {
    if (!networkRequest.request.failure()) {
      const sizes = await networkRequest.request.sizes();
      const responseBodySize = sizes.responseBodySize;
      const requestBodySize = sizes.requestBodySize;

      if (responseBodySize > 0) {
        totalSize += responseBodySize + requestBodySize;
      }
    }
  }

  return totalSize;
};
