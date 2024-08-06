import NextAuth from "next-auth";
import authConfig from "~/auth/auth.config";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "~/server/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  ...authConfig,
});
