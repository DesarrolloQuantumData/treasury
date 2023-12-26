import type { LinkProps } from 'react-router-dom'
import { Link } from 'react-router-dom'

import { getButtonClasses } from '@/features/common/components/ui/Button/classes'
import type { ButtonSizes, ButtonVariants, Colors, Rounded } from '@/features/common/types'

export interface LinkButtonProps extends LinkProps, React.RefAttributes<HTMLAnchorElement> {
  variant?: ButtonVariants
  color?: Colors
  size?: ButtonSizes
  rounded?: Rounded
  leftIcon?: React.ReactElement
  rightIcon?: React.ReactElement
}

export const LinkButton: React.FC<LinkButtonProps> = ({
  color = 'primary',
  variant = 'filled',
  size = 'md',
  rounded = 'md',
  children,
  className,
  leftIcon,
  rightIcon,
  ...restOfProps
}) => {
  const classes = getButtonClasses({ color, variant, size, rounded })
  return (
    <Link className={`${classes} ${className}`} {...restOfProps}>
      {leftIcon}
      {children}
      {rightIcon}
    </Link>
  )
}
