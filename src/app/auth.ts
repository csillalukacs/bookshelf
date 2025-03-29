import NextAuth from "next-auth"
import authConfig from "./auth.config"
import PostgresAdapter from "@auth/pg-adapter"
import { pool } from "./postgres"


export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PostgresAdapter(pool),
    session: { strategy: "jwt" },
    ...authConfig,
  });

 
