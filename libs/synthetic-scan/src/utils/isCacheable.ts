import { NetworkRequest } from '../synthetic-scan.service';

export const isCacheable = (value: NetworkRequest) => {
    const cacheControl = value.response?.headers()['cache-control'];

    return cacheControl?.includes('private') || cacheControl?.includes('public');
}
