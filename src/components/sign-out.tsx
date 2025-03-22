import { signOut } from "../app/auth"
 
export function SignOut() {
  return (
    <form
      action={async () => {
        "use server"
        await signOut(
          { 
            redirectTo: "/login" 
          }
        )
      }}
    >
      <button 
        type="submit" 
        className="flex items-center gap-2 hover:underline hover:underline-offset-4  cursor-pointer"
      >
        Sign Out
      </button>
    </form>
  )
}