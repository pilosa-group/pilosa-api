export type JWTPayload = {
  sub: string;
  clerk: {
    id: string;
    email: string;
    avatar: string;
    full_name: string;
    last_name: string;
    first_name: string;
    external_id: string;
    email_verified: boolean;
  };
};
