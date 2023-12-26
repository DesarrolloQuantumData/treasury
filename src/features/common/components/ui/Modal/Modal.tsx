import { Dialog, Transition } from '@headlessui/react'
import clsx from 'clsx'
import { Fragment } from 'react'

import { Divider } from '@/features/common/components/ui/Divider/Divider'
import { ModalBody } from '@/features/common/components/ui/Modal/ModalBody'
import { ModalFooter } from '@/features/common/components/ui/Modal/ModalFooter'
import { ModalHeader } from '@/features/common/components/ui/Modal/ModalHeader'
import { ModalHeaderCloseButton } from '@/features/common/components/ui/Modal/ModalHeaderCloseButton'
import { ModalTitle } from '@/features/common/components/ui/Modal/ModalTitle'
import { Spinner } from '@/features/common/components/ui/Spinner'

const sizes = {
  xs: 'max-w-md',
  sm: 'max-w-xl',
  md: 'max-w-2xl',
  lg: 'max-w-4xl ',
  xl: 'max-w-6xl',
  '2xl': 'max-w-8xl'
}

export interface ModalProps {
  show: boolean
  onClose?: () => void
  children?: React.ReactNode
  initialFocus?: React.MutableRefObject<HTMLElement | null>
  size?: keyof typeof sizes
  className?: string
  loading?: boolean
}

const ModalRoot: React.FC<ModalProps> = ({
  children,
  onClose,
  show,
  initialFocus,
  size,
  className,
  loading
}) => {
  return (
    <Transition appear as={Fragment} show={show}>
      <Dialog
        as='div'
        className='relative z-10'
        initialFocus={initialFocus}
        onClose={onClose || (() => null)}
      >
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-25' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto bg-primary-400 bg-opacity-60 backdrop-blur-sm'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel
                className={clsx(
                  `transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl ${className}`,
                  size ? sizes[size] : ''
                )}
              >
                {loading ? (
                  <div className='p-5'>
                    <Spinner size='md' />
                  </div>
                ) : (
                  children
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export const Modal = Object.assign(ModalRoot, {
  Header: ModalHeader,
  CloseButton: ModalHeaderCloseButton,
  Title: ModalTitle,
  Body: ModalBody,
  Footer: ModalFooter,
  Divider
})
