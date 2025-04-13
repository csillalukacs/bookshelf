import NextAuth from "next-auth"
import authConfig from "./auth.config"
import PostgresAdapter from "@auth/pg-adapter"
import { pool } from "./postgres"
import { fetchUserByEmail } from "./lib/data"

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PostgresAdapter(pool),
    session: { strategy: "jwt" },
    ...authConfig,
    callbacks: {
      session: async ({ session, token }) => {
        if (session?.user) {
          session.user.id = token.sub!;
        }
        return session;
      },
      jwt: async ({ user, token }) => {
        if (user) {
          token.uid = user.id;
        }
        return token;
      },
      async signIn({ user })
      {
        const existingUser = await fetchUserByEmail(user.email!);
        if (!existingUser) 
        {
          console.log("wow you're new!")
        }
        else 
        {
          console.log("you're old", existingUser)
        }
        return true;
      },
    },
  });
 
  
