/* eslint-disable no-param-reassign */
import GoogleProvider from "next-auth/providers/google";
import { AuthOptions } from "next-auth";
import { sql } from "@vercel/postgres";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    signIn: async ({ user }) => {
      try {
        await sql`INSERT INTO user_info ("user_id") VALUES (${user.id}) ON CONFLICT ("user_id") DO NOTHING`;
      } catch (err) {
        console.error(err);
      }
      return true;
    },
  },
};
