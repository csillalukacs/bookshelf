import { auth } from "./app/auth"
 
export default auth((req) => 
{
    console.log(req.nextUrl.pathname)
    if (!req.auth) 
    {
      console.log("Redirecting to log in page");

      const newUrl = new URL("/", req.nextUrl.origin)
      return Response.redirect(newUrl)
    }
})

export const config = {
  matcher: ['/book/:path*', '/profile', '/author/:path*', '/home']
};