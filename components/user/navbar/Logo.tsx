'use client'

import Image from "next/image"
import Link from "next/link";
import { useRouter } from "next/navigation"

const Logo = () => {
    const router = useRouter();
  return (
  <Link href="/">
    <Image
        src={'/assets/next.svg'} 
        alt="Logo" 
        width={100} 
        height={100}
        className="hidden md:block cursor-pointer"
    />
  </Link>
  )
}

export default Logo