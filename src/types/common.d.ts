export interface Session {
  expiresIn: number;
  tokenType: string;
  accessToken: string;
  refreshToken: string;
}
