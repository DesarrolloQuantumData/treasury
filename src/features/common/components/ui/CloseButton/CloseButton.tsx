import { type IconProps, X } from 'tabler-icons-react'

export interface CloseButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  iconProps?: IconProps
}

export const CloseButton: React.FC<CloseButtonProps> = ({
  className,
  iconProps,
  ...restOfProps
}) => {
  return (
    <button className={`rounded-full p-1 ${className}`} {...restOfProps}>
      <X {...iconProps} />
    </button>
  )
}
