import { Assign } from "utility-types";
import { IronSession } from "iron-session";

interface Session {
  auth: {
    expiresIn: number;
    tokenType: string;
    accessToken: string;
    refreshToken: string;
  };
}

declare module "next" {
  export interface NextApiRequest {
    session: Assign<IronSession, Session>;
  }
}
