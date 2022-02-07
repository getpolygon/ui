import { getSession } from "next-auth/react";
import { NextMiddleware, NextResponse } from "next/server";

export const middleware: NextMiddleware = async () => {
  // prettier-ignore
  const session = await getSession() as any;
  const user = await fetch(`${process.env.POLYGON_CORE}/api/users/me`, {
    headers: {
      "X-Refresh-Token": `${session?.user?.refreshToken}`,
      Authorization: `Bearer ${session?.user?.accessToken}`,
    },
  });

  console.log(user);

  if (user.status === 200) return NextResponse.next();
  else return NextResponse.redirect("/api/auth/signin");
};
