import { NetworkRequest } from '../synthetic-scan.service';

export const isCdn = (value: NetworkRequest) =>
  !!value.response?.headers()['x-cache'];
