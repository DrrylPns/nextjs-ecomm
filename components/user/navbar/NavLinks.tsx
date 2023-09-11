'use client'
import Link from 'next/link'
import {BiSearch} from 'react-icons/bi'

function NavLinks() {
  return (
    <div className='border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition'>
        <div className="flex flex-row items-center justify-between">
            <Link href={"/"} className="text-sm font-semibold px-6">
                    Home
            </Link>
            <Link href={"/posts"} className="hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center">
                    Posts
            </Link>
            <Link href={"/about"} className="text-sm pl-6 pr-6 text-gray-600 flex flex-row items-center gap-3">
                <div className="hidden sm:block">
                    About
                </div>
            </Link>
        </div>
    </div> 
  )
}

export default NavLinks