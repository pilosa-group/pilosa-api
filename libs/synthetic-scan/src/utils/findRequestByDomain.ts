import { NetworkRequest } from '@app/synthetic-scan';

export const findRequestByDomain =
  (domain: string) => (value: NetworkRequest) => {
    const url = new URL(value.request.url());
    return url.hostname === domain;
  };
