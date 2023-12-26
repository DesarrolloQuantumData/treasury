import { AlertCircle, AlertTriangle, CircleCheck, InfoCircle } from 'tabler-icons-react'

import { AlertTitle } from '@/features/common/components/ui/Alert/AlertTitle'

const variants = {
  success: {
    classes: 'bg-green-100 text-green-700',
    icon: <CircleCheck />
  },
  warning: {
    classes: 'bg-amber-100 text-amber-700',
    icon: <AlertTriangle />
  },
  info: {
    classes: 'bg-sky-100 text-sky-700',
    icon: <InfoCircle />
  },
  danger: {
    classes: 'bg-red-100 text-red-700',
    icon: <AlertCircle />
  }
}

interface AlertProps {
  variant: keyof typeof variants
  children: React.ReactNode
  showIcon?: boolean
}

const AlertRoot: React.FC<AlertProps> = ({ children, variant: variantFromProps, showIcon }) => {
  const variant = variants[variantFromProps]

  return (
    <div className={`flex gap-2 p-2 rounded-md ${variant.classes}`} role='alert'>
      {showIcon && <figure>{variant.icon}</figure>}
      <div className='flex-grow'>{children}</div>
    </div>
  )
}

export const Alert = Object.assign(AlertRoot, { Title: AlertTitle })
