import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { LoginForm } from '@/features/auth/components/LoginForm'
import { useAuth, useAuthStore } from '@/features/auth/store/AuthContext'
import { Alert } from '@/features/common/components/ui/Alert'
import { type AuthValues } from '@/features/common/types'
import Logo from '@/features/svg/LOGO.svg'

export const LoginPage: React.FC = () => {
  const navigate = useNavigate()
  const { isLoggingIn, login, error } = useAuth()

  const { isAuthenticated } = useAuthStore()

  const handleSuccess = (values: AuthValues): void => {
    login(values, () => navigate('/home'))
  }

  useEffect(() => {
    if (isAuthenticated) navigate('/home')
  }, [])

  return (
    <>
      <div className='flex flex-col h-screen w-full items-center justify-center bg-cover backgroundLogin'>
        <div className='rounded-xl border shadow-md bg-primaryBackground-200'>
          <div className='flex flex-col text-center pt-20 px-20'>
            <h2 className='text-6xl text-primary'>Bienvenido</h2>
            <p className='text-sm text-primaryText'>Ingrese con sus credenciales de acceso</p>

            {error && (
              <div className='my-5'>
                <Alert showIcon variant='danger'>
                  {error}
                </Alert>
              </div>
            )}

            <LoginForm isLoading={isLoggingIn} onSuccess={handleSuccess} />

            <div className='flex flex-col items-center text-center justify-around pb-3'>
              <picture>
                <img alt='logo' src={Logo} />
              </picture>
            </div>
            <div className='flex flex-col items-center text-center justify-around pb-20'>
              <p className='text-sm opacity-75 text-primaryText-50'>
                © 2023 Copyright FINANZAUTO - Todos los derechos reservados
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
