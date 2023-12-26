import clsx from 'clsx'

type Size = 'sm' | 'md' | 'lg' | 'xl'

const orientations = {
  horizontal: 'horizontal',
  vertical: 'vertical'
}

type Sizes = Record<keyof typeof orientations, Record<Size, string>>

const sizes: Sizes = {
  horizontal: {
    sm: 'border-t',
    md: 'border-t-2',
    lg: 'border-t-4',
    xl: 'border-t-8'
  },
  vertical: {
    sm: 'border-r',
    md: 'border-r-2',
    lg: 'border-r-4',
    xl: 'border-r-8'
  }
}

const variants = {
  solid: 'border-solid',
  dashed: 'border-dashed',
  dotted: 'border-dotted',
  double: 'border-double'
}

export interface DividerProps {
  size?: Size
  orientation?: keyof typeof orientations
  variant?: keyof typeof variants
  className?: string
}

export const Divider: React.FC<DividerProps> = ({
  size = 'sm',
  orientation = 'horizontal',
  variant = 'solid',
  className
}) => {
  return <div className={clsx(sizes[orientation][size], variants[variant], className)} />
}
