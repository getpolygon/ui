import { Assign } from "utility-types";
import { IronSession } from "iron-session";

declare module "next" {
  export interface NextApiRequest {
    session: Assign<IronSession, { auth: Session }>;
  }
}
