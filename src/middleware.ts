import NextAuth from "next-auth"
import authConfig from "./app/auth.config"
 
export const { auth: middleware } = NextAuth(authConfig)

// export const config = {
//   matcher: ['/book/:path*', '/profile', '/author/:path*', '/home']
// };