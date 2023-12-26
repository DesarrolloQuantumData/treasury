import type {
  ColorsDefinition,
  RoundedDefinition,
  TextSizesDefinition
} from '@/features/common/types'

export const colorsClasses: ColorsDefinition = {
  black: {
    bg: 'bg-black',
    border: 'border-black',
    text: 'text-white',
    textContrast: 'text-white'
  },
  info: {
    bg: 'bg-blue-500',
    border: 'border-blue-500',
    text: 'text-blue-500',
    textContrast: 'text-white'
  },
  secondary: {
    bg: 'bg-secondary',
    border: 'border-secondary',
    text: 'text-secondary',
    textContrast: 'text-white'
  },
  tertiary: {
    bg: 'bg-tertiary',
    border: 'border-tertiary',
    text: 'text-tertiary',
    textContrast: 'text-white'
  },
  primary: {
    bg: 'bg-primary',
    textContrast: 'text-white',
    text: 'text-primary',
    border: 'border-primary'
  },
  danger: {
    bg: 'bg-red-500',
    border: 'border-red-500',
    text: 'text-red-500',
    textContrast: 'text-white'
  },
  success: {
    bg: 'bg-green-500',
    border: 'border-green-500',
    text: 'text-green-500',
    textContrast: 'text-white'
  },
  warning: {
    bg: 'bg-amber-500',
    border: 'border-amber-500',
    text: 'text-amber-500',
    textContrast: 'text-white'
  },
  white: {
    bg: 'bg-white',
    border: 'boder-white',
    text: 'text-white',
    textContrast: 'text-gray-900'
  }
}

export const textSizeClasses: TextSizesDefinition = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-md',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl',
  '5xl': 'text-5xl',
  '6xl': 'text-6xl'
}

export const roundedClasses: RoundedDefinition = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  '3xl': 'rounded-3xl',
  full: 'rounded-full'
}
