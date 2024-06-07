import { NetworkRequest } from '../synthetic-scan.service';

const cdnHeaders = [
  'x-cache',
  'x-amz-cf-pop',
  'x-fastly-request-id',
  'cf-cache-status',
  'x-varnish',
  'x-edge-location',
];

/**
 * Check if a response is served from a CDN
 * @param value
 */
export const isCdn = (value: NetworkRequest) =>
  cdnHeaders.some((header) => value.response?.headers()[header]);
