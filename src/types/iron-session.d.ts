import { Assign } from "utility-types";
import { Session } from "./common";

declare module "iron-session" {
  interface IronSessionData {
    auth: Session;
  }
}
