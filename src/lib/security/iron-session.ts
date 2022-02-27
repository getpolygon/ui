import env from "env-var";
import { NextApiRequest } from "next";
import { Assign } from "utility-types";
import { IronSession, IronSessionOptions } from "iron-session";

const IRON_SESSION_SECRET = env
  .get("IRON_SESSION_SECRET")
  .required(true)
  .asString();

export type AuthProps = {
  data: {
    expiresIn: number;
    tokenType: string;
    accessToken: string;
    refreshToken: string;
  };
};

export type Request = Assign<NextApiRequest, { session: Session }>;

export type Session = Assign<IronSession, { auth: AuthProps["data"] }>;

export const options: IronSessionOptions = {
  cookieName: "polygon.sid",
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  },
  password: IRON_SESSION_SECRET,
};
