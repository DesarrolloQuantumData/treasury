import React from 'react'

import { Button } from '@/features/common/components/ui/Button'
import { Modal, ModalBody, ModalHeader } from '@/features/common/components/ui/Modal'

interface ModalFromProps {
  dataModalForm?: {
    firstTitle?: string
    secondTitle?: string
    description?: string
  }
  showModal: boolean
  children?: React.ReactNode
  onClose: () => void
}

export const ModalFormStyle: React.FC<ModalFromProps> = ({
  children,
  showModal,
  dataModalForm,
  onClose
}) => {
  const { firstTitle, secondTitle, description } = dataModalForm || {}

  return (
    <Modal className='p-5' show={showModal}>
      <div className='flex justify-end '>
        <Button className='bg-transparent' onClick={onClose}>
          <span className='text-xl icon-circle-xmark text-primaryText-50' />
        </Button>
      </div>

      <ModalHeader>
        <div className='font-bold text-primary text-5xl bg-slate-50 p-5 w-full rounded-2xl'>
          <h3 className='text-3xl text-secondary'>{firstTitle}</h3>
          <div>
            <span>{secondTitle}</span>
          </div>
        </div>
      </ModalHeader>

      <ModalBody>
        <div className='space-y-2'>
          <p className='text-center text-gray-600 mb-5 mx-10'>{description}</p>
          {children}
        </div>
      </ModalBody>
    </Modal>
  )
}
