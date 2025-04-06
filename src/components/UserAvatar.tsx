import { fetchUserById } from "@/app/lib/data";
import Image from "next/image"

export default async function UserAvatar({userId} : {userId: string})
{
  const user = await fetchUserById(userId);
  
  return (
    <div className="">
        <Image
          src={user?.uploadedImage ? user.uploadedImage : '/user.png'}
          alt="profile picture"
          width={40}
          height={40}
          className="rounded-full border-2 shadow-sm"
        />
    </div>
  )
} 