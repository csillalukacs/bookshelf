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
      <button type="submit">Signin with Google</button>
    </form>
  )
} 