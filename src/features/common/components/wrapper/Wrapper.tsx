import clsx from 'clsx'
import type { ReactNode } from 'react'

const sizesClasses = {
  xs: 'max-w-xs',
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  '4xl': 'max-w-4xl',
  '5xl': 'max-w-5xl',
  '6xl': 'max-w-6xl',
  '7xl': 'max-w-7xl',
  '8xl': 'max-w-[90rem]',
  '9xl': 'max-w-[100rem]',
  full: 'max-w-full',
  min: 'max-w-min',
  max: 'max-w-max'
}

export interface WrapperProps extends React.DetailsHTMLAttributes<HTMLDivElement> {
  children: ReactNode
  className?: string
  size?: keyof typeof sizesClasses
}

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  className,
  size = '8xl',
  ...restOfProps
}) => {
  return (
    <div className={clsx('mx-auto', sizesClasses[size], className)} {...restOfProps}>
      {children}
    </div>
  )
}
