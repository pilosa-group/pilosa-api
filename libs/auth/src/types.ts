export type JWTPayload = {
  clerk: {
    avatar: string;
    email: string;
    email_verified: boolean;
    external_id: string;
    first_name: string;
    full_name: string;
    id: string;
    last_name: string;
  };
  sub: string;
};
