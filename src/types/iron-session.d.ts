import { Session } from "./common";

declare module "iron-session" {
  export interface IronSession {
    auth: Session;
  }
}
