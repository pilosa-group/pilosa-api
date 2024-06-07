import { NetworkRequest } from '../synthetic-scan.service';

export const isDomain =
  (domain: string) => (networkRequest: NetworkRequest) => {
    return new URL(networkRequest.url).hostname.includes(domain);
  };
