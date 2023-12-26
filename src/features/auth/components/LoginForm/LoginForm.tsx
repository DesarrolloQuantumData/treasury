import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import type { LoginValues } from '@/features/auth/components/LoginForm/types'
import { loginSchema } from '@/features/auth/components/LoginForm/types'
import { Button } from '@/features/common/components/ui/Button'
import { InputField } from '@/features/common/components/ui/Form'
import { SwitchField } from '@/features/common/components/ui/Form/SwitchField'

export interface LoginFormProps {
  onSuccess: (values: LoginValues) => void
  isLoading?: boolean
}

export const LoginForm: React.FC<LoginFormProps> = ({ isLoading, onSuccess }) => {
  const { formState, handleSubmit, register } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema)
  })
  const { errors } = formState
  const [showPassword, setShowPassword] = useState(false)
  const [isChecked, setIsChecked] = useState(false)

  return (
    <form onSubmit={handleSubmit(onSuccess)}>
      <div className='space-y-4 mt-10'>
        <div className='relative'>
          <InputField
            error={errors.username?.message}
            type='text'
            {...register('username')}
            className='text-sm pl-9 text-primaryText-50'
            placeholder='Usuario'
          />
          <span className='absolute text-lg top-2 left-3 icon-user text-primaryText-50' />
        </div>
        <div className='relative'>
          <InputField
            error={errors.password?.message}
            type={showPassword ? 'text' : 'password'}
            {...register('password')}
            className='text-sm pl-9 text-primaryText-50'
            placeholder='Contraseña'
          />
          <span className='absolute text-lg top-2 left-3 icon-key text-primaryText-50' />

          {showPassword ? (
            <Button
              className='absolute bg-transparent top-0 right-0'
              onClick={() => setShowPassword(false)}
            >
              <span className='text-lg icon-eye-slash text-primaryText-50' />
            </Button>
          ) : (
            <Button
              className='absolute bg-transparent top-0 right-0'
              onClick={() => setShowPassword(true)}
            >
              <span className='text-xl icon-eye text-primaryText-50' />
            </Button>
          )}
        </div>
        <div className='justify-start flex pb-6'>
          <SwitchField
            checked={isChecked}
            fontSize='sm'
            label='Recordar los datos'
            labelColor='#A1A2A1'
            labelPosition='right'
            onChange={(newChecked) => setIsChecked(newChecked)}
          />
        </div>
      </div>
      <div className='flex items-center justify-around pb-20'>
        <Button
          className='w-80 bg-secondary button'
          loading={isLoading}
          rounded={'full'}
          type='submit'
        >
          <span className='icon-arrow-right' style={{ zIndex: 100 }} />
          <span style={{ zIndex: 100 }}>Ingresar</span>
        </Button>
      </div>
    </form>
  )
}
