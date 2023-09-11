'use client'
import Container from '@/components/Container'
import UserMenu from './UserMenu'
import NavLinks from './NavLinks'
import Logo from './Logo'
import { User } from '@prisma/client'

interface NavBarProps {
  currentUser?: User | null;
}

const Navbar: React.FC<NavBarProps> = ({
  currentUser
}) => {

  return (
    <nav className='fixed w-full shadow-sm'>
        <div className='py-4 border-b-[1px]'>
        <Container>
            <div
            className='flex flex-row items-center justify-between gap-3 md:gap-0'
            >
            <Logo />
            <NavLinks />
            <UserMenu currentUser={currentUser}/>
            </div>
        </Container>
        </div>
    </nav>
  )
}

export default Navbar