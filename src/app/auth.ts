import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

 
export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [Google(
      {
        // these appear to be the default options
        // so im only keeping them to make a note of the fact that
        // i dont know what they do 
        // because in the .env file the variables have to be named
        // AUTH_GOOGLE_ID and AUTH_GOOGLE_SECRET anyway (https://authjs.dev/guides/environment-variables) !!!!
        // (and i wasted some time trying to figure out 
        // why auth was not working with GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in the env file)
        // so this might be something else entirely??
        // i am making a decision not to waste time looking into this now
        // but just notice that im confused
        clientId: process.env.GOOGLE_CLIENT_ID, 
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
      }
    )],
    // callbacks: {
    //     authorized: async ({ auth }) => {
    //     // Logged in users are authenticated, otherwise redirect to login page
    //     return !!auth
    //     },
    // },
  });

 
