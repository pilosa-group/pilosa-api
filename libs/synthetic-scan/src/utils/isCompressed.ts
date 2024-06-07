import { NetworkRequest } from '../synthetic-scan.service';

/**
 * Check if the response is compressed
 * @param value
 */
export const isCompressed = (value: NetworkRequest) =>
  !!value.response?.headers()['content-encoding']?.includes('gzip');
