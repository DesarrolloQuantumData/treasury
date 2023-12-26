import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuth, useAuthStore } from '@/features/auth/store/AuthContext'
import { Link } from '@/features/common/components/ui/Link'
import Logo from '@/features/svg/LOGO.svg'
import { ModulePage, SubModulePage, SubSubmodulePage, clear} from './BreadCrumbs';

export const Navbar: React.FC = () => {
  const navigate = useNavigate()
  const { logout } = useAuth()
  const { firstName, lastName, loggedInDate } = useAuthStore()
  const fullname = `${firstName} ${lastName}`
  const initials = firstName ? firstName.charAt(0) : ''

  return (
    <nav className='navbar'>
      <div className='justify-between items-center flex h-24 lg:pl-56'>
        <Link aria-label='Ir al home' to={'/home'}>
          <div className='flex'>
            <picture>
              <img alt='Logo ' className='px-3 w-56' src={Logo} onClick={() => {
                clear()
              }} />
            </picture>
          </div>
        </Link>

        <div className='flex justify-between text-secondaryText lg:pr-56'>
          <div className='flex justify-center items-center mr-1 md:mr-4 bg-primaryNotification rounded-full py-2 px-5 '>
            <Menu as='div' className='relative'>
              <div className='flex'>
                <Menu.Button className='relative'>
                  <span className='icon-bell text-xl' />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter='transition ease-out duration-100'
                enterFrom='transform opacity-0 scale-95'
                enterTo='transform opacity-100 scale-100'
                leave='transition ease-in duration-75'
                leaveFrom='transform opacity-100 scale-100'
                leaveTo='transform opacity-0 scale-95'
              />
            </Menu>
          </div>
          <div className='flex md:flex-col items-end text-sm bg-primaryNotification rounded-full py-3 md:px-10 px-2 relative'>
            <p className='text-secondaryText font-bold'>{fullname}</p>
            <p className='text-xs text-primaryText'>
              {loggedInDate?.toLocaleString('es-CO', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
            <div className=' bg-primary rounded-full text-sm py-5 px-7 absolute bottom-0 -right-7'>
              <button
                className='text-secondaryText underline font-bold'
                onClick={() => logout(() => navigate('/login'))}
              >
                <p className='text-primaryBackground font-bold'>{initials}</p>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='flex items-center py-2 md:pl-56 h-14 bg-primary'>
        <p className='text-primaryBackground px-2'>
          Inicio
        </p>
        <span className='icon-chevron-down text-primaryBackground -rotate-90 text-xs' />
        <p className='text-primaryBackground px-2'>
          {ModulePage}
        </p>
        {ModulePage !== "" && <span className='icon-chevron-down text-primaryBackground -rotate-90 text-xs' />}
        <p className='text-primaryBackground px-2'>
          {SubModulePage}
        </p>
        {SubModulePage !== "" && <span className='icon-chevron-down text-primaryBackground -rotate-90 text-xs' />}
        <p className='text-primaryBackground px-2'>
          {SubSubmodulePage}
        </p>
        {SubSubmodulePage !== "" && <span className='icon-chevron-down text-primaryBackground -rotate-90 text-xs' />}
      </div>
    </nav>
  )
}
