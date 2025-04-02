import Image from "next/image"

export default function Logo() {

  return (
    <div className="p-2 rounded-full">
        <Image
          src={"/logo.svg"}
          alt="logo"
          width={40}
          height={40}
          className=""
        />
    </div>
  )
} 