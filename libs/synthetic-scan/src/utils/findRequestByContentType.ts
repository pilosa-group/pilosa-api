import { NetworkRequest } from '../synthetic-scan.service';

export const findRequestByContentType =
  (contentType: string) => (value: NetworkRequest) => {
    const response = value.response;

    if (!response) {
      return false;
    }

    const headers = response.headers();

    return headers['content-type']?.includes(contentType);
  };
