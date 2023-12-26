import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import type { cashFlowConceptsFormValues } from '@/features/admin/schemas/cashFlowConcepts/cashFlowConceptsSchema'
import { modalCashFlowConceptsSchema } from '@/features/admin/schemas/cashFlowConcepts/cashFlowConceptsSchema'
import { Button } from '@/features/common/components/ui/Button'
import { InputField, SelectField } from '@/features/common/components/ui/Form'
import { ModalFormStyle } from '@/features/common/components/ui/Modal/modalStyle/ModalFormStyle'

import { getDefaultSelectOption } from '@/features/common/utils/defaults'
import { useAccountsSelects } from '../../concepts/components/accountsForm/useAccountsSelects'
import { updateCashFlowConcepts } from '../services/cashFlowConceptsServices'
import { useState } from 'react'

interface ModalCashFlowConceptsProps {
  showModal: boolean
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
  selectedCashFlowConcepts: any | null
  isActive: boolean
  getTableCashFlowConcepts:any
}

export const ModalEditCashFlowConceptsForm: React.FC<ModalCashFlowConceptsProps> = ({
  showModal,
  setShowModal,
  selectedCashFlowConcepts,
  isActive,
  getTableCashFlowConcepts
}) => {
  const { formState, reset, handleSubmit, register } = useForm<cashFlowConceptsFormValues>({
    resolver: zodResolver(modalCashFlowConceptsSchema)
  })
  const { errors } = formState
  const selects = useAccountsSelects()

  const[value,setValue]=useState(0)
  const[name,setName]=useState(selectedCashFlowConcepts.name)

  const { natureTypes } = selects
  const defaultOption = {accountType: getDefaultSelectOption({}, 'Naturaleza')}
  const onClose = () => {
    setShowModal(false)
    reset()
    getTableCashFlowConcepts()
  }

  const onSuccess = async (values: cashFlowConceptsFormValues): Promise<void> => {
    try {
      if (selectedCashFlowConcepts !== null) {
        await updateCashFlowConcepts(selectedCashFlowConcepts.id, { ...values, isActive })
      }
      onClose()
    } catch (error) {
      console.log(error)
      onClose()
    }
  }

  return (
    <ModalFormStyle
      dataModalForm={{
        firstTitle: 'Concepto FDC',
        secondTitle: 'Editar información',
        description: 'Diligenciar todos los campos que quiere editar'
      }}
      onClose={onClose}
      showModal={showModal}
    >
      <form onSubmit={handleSubmit(onSuccess)}>
        <div className='space-y-3'>
          <div className='relative w-1/2'>
            <InputField
              className='bg-transparent text-lg w-1/2'
              defaultValue={selectedCashFlowConcepts.id}
              disabled
              placeholder='0000000000'
            />
            <span className='absolute text-lg top-2 left-3 icon-key text-primaryText-50' />
            <div className='flex justify-end mr-3'>
              <span className='absolute text-lg top-2.5 icon-check text-secondary' />
            </div>
          </div>

          <div className='relative w-full'>
            <InputField
              {...register('name')}
              className='bg-transparent text-lg'
              error={errors.name?.message}
              placeholder='Concepto presupuestal'
              type='text'
              value={name}
                onChange={(event) => {
                  if (event.target.value.length >= 0 && event.target.value.length <= 50) {
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

          <div className='relative w-full'>
          <SelectField
                {...register('natureTypeId')}
                className='bg-transparent text-lg text-primaryText-50 '
                error={errors.natureTypeId?.message}
                options={[defaultOption.accountType, ...natureTypes]}
              />
            <span className='absolute text-lg top-2 left-3 icon-file-pen text-primaryText-50' />
          </div>
          <div className='flex sm:justify-end'>
            <Button
              className='bg-secondary z-10 w-full sm:w-52 h-12 mt-3 button'
              onClick={() => setShowModal(true)}
              rounded='xl'
              type='submit'
            >
              <span className='z-10 icon-file-pen left-4' />
              <span className='z-10'>Editar</span>
            </Button>
          </div>
        </div>
      </form>
    </ModalFormStyle>
  )
}
