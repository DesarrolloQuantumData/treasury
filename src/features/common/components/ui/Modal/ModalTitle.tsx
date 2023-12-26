import { Dialog } from '@headlessui/react'
import React from 'react'

export interface ModalTitleProps {
  as?: keyof JSX.IntrinsicElements
  children: React.ReactNode
}

export const ModalTitle: React.FC<ModalTitleProps> = ({ as = 'h3', children }) => {
  return (
    <Dialog.Title as={as} className='text-lg font-medium leading-6 text-gray-900'>
      {children}
    </Dialog.Title>
  )
}
