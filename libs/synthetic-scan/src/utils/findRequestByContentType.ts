import { NetworkRequest } from '../synthetic-scan.service';

export const findRequestByContentType =
  (contentType: string[]) => (value: NetworkRequest) => {
    const response = value.response;

    if (!response) {
      return false;
    }

    const headers = response.headers();

    return contentType.some((type) => headers['content-type']?.includes(type));
  };
