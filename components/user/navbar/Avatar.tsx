'use client'
import Image from "next/image";

interface AvatarProps {
    src: string | null | undefined
}

const Avatar: React.FC<AvatarProps> = ({src}) => {

    return (
        <Image
            className="rounded-full"
            width={30}
            height={30}
            alt="avatar"
            src={src || '/assets/placeholder.jpg'}
        />
    )
}

export default Avatar;