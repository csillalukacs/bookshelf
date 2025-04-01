import { logOut } from "@/app/actions"
 
export function SignOut() 
{
  return (
    <form
      action={logOut}
    >
      <button 
        type="submit" 
        className="flex items-center gap-2 text-sm  cursor-pointer"
      >
        Sign Out
      </button>
    </form>
  )
}