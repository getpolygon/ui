import NextAuth from "next-auth";
import { isEmpty } from "lodash";
import axios from "~/lib/http/axios";
import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

const options: NextAuthOptions = {
  providers: [
    Credentials({
      id: "polygon",
      name: "Polygon",
      type: "credentials",
      credentials: {
        email: {
          type: "email",
          label: "Email",
          placeholder: "Email",
        },
        password: {
          type: "password",
          label: "Password",
          placeholder: "********",
        },
      },
      authorize: async (credentials) => {
        const response = await axios.post("/api/auth/login", credentials);
        if (response.status === 200) return response.data;
        else return null;
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user: data }) => {
      if (!isEmpty(data)) {
        token.accessToken = (data as any).accessToken;
        token.refreshToken = (data as any).refreshToken;
      }

      return token;
    },

    session: ({ session, token }) => {
      (session as any).user = token;
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};

export default NextAuth(options);
