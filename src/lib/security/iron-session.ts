import { IronSessionOptions } from "iron-session";

export const options: IronSessionOptions = {
  cookieName: "polygon.sid",
  // Encryption secret
  password: process.env.IRON_SESSION_SECRET!,
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  },
};
