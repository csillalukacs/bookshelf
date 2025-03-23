import { signIn } from "../app/auth"
 
export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server"
        console.log("haha")
        await signIn("google", { redirectTo: "/" })
      }}
    >
      <button type="submit" className="text-xl cursor-pointer">Sign in with Google</button>
    </form>
  )
} 