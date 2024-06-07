import { NetworkRequest } from '../synthetic-scan.service';

/**
 * Check if the request is publicly cacheable
 * @param cacheControl
 */
export const isPublicCacheable = (cacheControl: string) =>
  cacheControl.includes('public');

/**
 * Check if the request is privately cacheable
 * @param cacheControl
 */
export const isPrivateCacheable = (cacheControl: string) =>
  cacheControl.includes('private');

/**
 * Check if the request is cacheable (either publicly or privately)
 * @param value
 */
export const isCacheable = (value: NetworkRequest) => {
  const cacheControl = value.response?.headers()['cache-control'];

  return (
    cacheControl &&
    (isPublicCacheable(cacheControl) || isPrivateCacheable(cacheControl))
  );
};
