import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import type { AccountFormValues } from '@/features/admin/schemas/account/accountSchemas'
import { modalAccountFormSchema } from '@/features/admin/schemas/account/accountSchemas'
import { Button } from '@/features/common/components/ui/Button'
import { InputField } from '@/features/common/components/ui/Form'
import { SelectField } from '@/features/common/components/ui/Form/SelectField'
import { TextAreaField } from '@/features/common/components/ui/Form/TextAreaField'
import { ModalFormStyle } from '@/features/common/components/ui/Modal/modalStyle/ModalFormStyle'
import { getDefaultSelectOption } from '@/features/common/utils/defaults'

import { createAccounts } from '../services/accountService'
import { useAccountsSelects } from './accountsForm/useAccountsSelects'
import { useState } from 'react'

const defaultOptions = {
  accountType: getDefaultSelectOption({ valueAsNumber: true }, 'Tipo Cuenta'),
  companyName: getDefaultSelectOption({ valueAsNumber: true }, 'Empresa titular'),
  bankName: getDefaultSelectOption({ valueAsNumber: true }, 'Banco'),
  interfaceName: getDefaultSelectOption({ valueAsNumber: true }, 'Interface de captura')
}

interface ModalProps {
  showModal: boolean
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const ModalAccountsForm: React.FC<ModalProps> = ({ showModal, setShowModal }) => {
  const { formState, reset, handleSubmit, register } = useForm<AccountFormValues>({
    resolver: zodResolver(modalAccountFormSchema)
  })

  const { errors } = formState
  const [account, setAccount] = useState("")
  const [name, setName] = useState("")
  const [specialCondition, setSpecialCondition] = useState("")
  const [value, setValue] = useState(0)
  const selects = useAccountsSelects()

  const { bankName, companyName, accountType, interfaceName } = selects

  const onClose = () => {
    setShowModal(false)
    reset()
    setAccount("")
    setName("")
    setSpecialCondition("")
  }

  const onSuccess = async (values: AccountFormValues) => {
    try {
      await createAccounts(values)
      onClose()
    } catch (error) {
      console.log(error)
      onClose()
    }
  }

  return (
    <ModalFormStyle
      dataModalForm={{
        firstTitle: 'Crear',
        secondTitle: 'Nueva Cuenta',
        description: 'Diligenciar todos los campos, para añadir un nuevo registro'
      }}
      onClose={onClose}
      showModal={showModal}
    >
      <form onSubmit={handleSubmit(onSuccess)}>
        <div className='space-y-3'>
          <div className='flex gap-2 sm:gap-3 '>
            <div className='relative w-full'>
              <SelectField
                {...register('accountTypeId')}
                className='bg-transparent text-lg text-primaryText-50 '
                error={errors.accountTypeId?.message}
                options={[defaultOptions.accountType, ...accountType]}
              />
              <span className='absolute text-lg top-2 left-3 icon-file-lines text-primaryText-50' />
            </div>
          </div>

          <div className='relative '>
            <InputField
              {...register('accountNumber')}
              className='bg-transparent text-lg '
              error={errors.accountNumber?.message}
              placeholder='No. Cuenta'
              type='text'
              value={account}
              onChange={(event) => {
                const numbers = /^[0-9]+$/.test(event.target.value);
                if (numbers && event.target.value.length >= 0 && event.target.value.length <= 20) {
                  setAccount(event.target.value);
                }
                if (event.target.value.length <= value) {
                  setValue(event.target.value.length)
                  setAccount(event.target.value)
                }
              }}
            />
            <span className='absolute text-lg top-2 left-3 font-bold icon-hashtag text-primaryText-50' />
          </div>

          <div className='relative'>
            <InputField
              {...register('description')}
              className='bg-transparent text-lg'
              error={errors.description?.message}
              placeholder='Nombre/Descripción'
              type='text'
              value={name}
              onChange={(event) => {
                if (event.target.value.length >= 0 && event.target.value.length <= 25) {
                  const array = event.target.value.split(' ')
                  if (array.length == 1) {
                    setName(event.target.value.replace(/\b\w/g, (match) => match.toUpperCase()));
                  } else {
                    setName(event.target.value);
                  }
                }
                if (event.target.value.length <= value) {
                  setValue(event.target.value.length)
                  setName(event.target.value)
                }
              }}
            />
            <span className='absolute text-lg top-2 left-3 icon-file-pen text-primaryText-50' />
          </div>

          <div className='flex flex-col sm:flex-row gap-4 w-full sm:max-w-lg'>
            <div className='relative w-full sm:w-1/2'>
              <SelectField
                {...register('companyId')}
                className='bg-transparent text-lg text-primaryText-50'
                error={errors.companyId?.message}
                options={[defaultOptions.companyName, ...companyName]}
              />
              <span className='absolute text-lg top-2 left-3 font-bold icon-hashtag text-primaryText-50' />
            </div>
            <div className='flex gap-2 sm:gap-4'>
              <div className='relative w-full sm:w-1/2'>
                <SelectField
                  {...register('bankId')}
                  className='bg-transparent text-lg text-primaryText-50'
                  error={errors.bankId?.message}
                  options={[defaultOptions.bankName, ...bankName]}
                />
                <span className='absolute text-lg top-2 left-3 icon-file-lines text-primaryText-50' />
              </div>
              <div className='relative w-full sm:w-1/2'>
                <SelectField
                  {...register('interfaceId')}
                  className='bg-transparent text-lg text-primaryText-50  '
                  error={errors.interfaceId?.message}
                  options={[defaultOptions.interfaceName, ...interfaceName]}
                />
                <span className='absolute text-lg top-2 left-3  icon-file-lines text-primaryText-50' />
              </div>
            </div>
          </div>

          <div className='relative'>
            <TextAreaField
              {...register('specialCondition')}
              className='bg-transparent text-lg'
              error={errors.specialCondition?.message}
              placeholder='Condiciones especiales'
              type='text'
              value={specialCondition}
              onChange={(event) => {
                if (event.target.value.length >= 0 && event.target.value.length <= 100) {
                  const array = event.target.value.split(' ')
                  if (array.length == 1) {
                    setSpecialCondition(event.target.value.replace(/\b\w/g, (match) => match.toUpperCase()));
                  } else {
                    setSpecialCondition(event.target.value);
                  }
                }
                if (event.target.value.length <= value) {
                  setValue(event.target.value.length)
                  setSpecialCondition(event.target.value)
                }
              }}
            />
            <span className='absolute text-lg top-2 left-3 icon-file-pen text-primaryText-50' />
          </div>

          <div className='flex sm:justify-end'>
            <Button
              className='bg-secondary w-full sm:w-52 h-12 mt-3 button'
              rounded='2xl'
              type='submit'
            >
              <span className='z-10 icon-check left-4' />
              <span className='z-10'>Crear</span>
            </Button>
          </div>
        </div>
      </form>
    </ModalFormStyle>
  )
}
