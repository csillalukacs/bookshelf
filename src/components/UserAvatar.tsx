'use client'

import { useSession } from "next-auth/react"
import { auth } from "../app/auth"
import Image from "next/image"
 
export default function UserAvatar({image}: {image?: string}) 
{
  const session = useSession();
 
  // if (!session?.user) return null

 
  return (
    <div className="">
        {session.data?.user?.image ? 
          <Image 
            src={session.data?.user?.image} 
            alt="profile picture" 
            width={40} 
            height={40}
            className="rounded-full border-2 shadow-sm"
          /> 
          : <div className="rounded-full w-10 h-10 bg-gray-400 flex items-center justify-center"></div>
        }   
      </div>
  )
} 