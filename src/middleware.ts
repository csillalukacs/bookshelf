import { auth } from "./app/auth"
 
export default auth((req) => {
    console.log(req.nextUrl.pathname)
  if (!req.auth && req.nextUrl.pathname === "/") {
    console.log("Redirecting to /login...");

    const newUrl = new URL("/login", req.nextUrl.origin)
    return Response.redirect(newUrl)
  }
})
