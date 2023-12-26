import {
  getButtonClasses,
  getSpinnerSizeFromButtonSize
} from '@/features/common/components/ui/Button/classes'
import { Spinner } from '@/features/common/components/ui/Spinner'
import type { ButtonSizes, ButtonVariants, Colors, Rounded } from '@/features/common/types'

export interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant?: ButtonVariants
  color?: Colors
  size?: ButtonSizes
  rounded?: Rounded
  loading?: boolean
  loadingPosition?: 'right' | 'left'
  leftIcon?: React.ReactElement
  rightIcon?: React.ReactElement
}

export const Button: React.FC<ButtonProps> = ({
  type = 'button',
  color = 'primary',
  variant = 'filled',
  size = 'md',
  rounded = 'md',
  children,
  className,
  disabled,
  loading,
  loadingPosition = 'left',
  leftIcon,
  rightIcon,
  ...restOfProps
}) => {
  const classes = getButtonClasses({ color, variant, size, rounded })
  const spinnerSize = loading ? getSpinnerSizeFromButtonSize({ size }) : undefined

  return (
    <button
      className={`${classes} ${className}`}
      disabled={loading || disabled}
      type={type}
      {...restOfProps}
    >
      {loading && loadingPosition === 'left' ? <Spinner size={spinnerSize} /> : null}
      {!loading ? leftIcon : null}
      {children}
      {loading && loadingPosition === 'right' ? <Spinner size={spinnerSize} /> : null}
      {!loading ? rightIcon : null}
    </button>
  )
}
