import { NetworkRequest } from '../synthetic-scan.service';

export const isCompressed = (value: NetworkRequest) => !!value.response?.headers()['content-encoding']?.includes('gzip')
