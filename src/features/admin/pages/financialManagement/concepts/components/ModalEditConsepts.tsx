import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import type { ConceptsFormValues } from '@/features/admin/schemas/concepts/conceptsSchema'
import { modalConceptsFormSchema } from '@/features/admin/schemas/concepts/conceptsSchema'
import { InputField } from '@/features/common/components/ui/Form'
import { SelectField } from '@/features/common/components/ui/Form/SelectField'
import { ModalFormStyle } from '@/features/common/components/ui/Modal/modalStyle/ModalFormStyle'
import { updateConcepts } from '../services/ConceptsServices'
import { Button } from '@/features/common/components/ui/Button'
import { getDefaultSelectOption } from '@/features/common/utils/defaults'
import { useAccountsSelects } from './accountsForm/useAccountsSelects'
import { useState } from 'react'

interface ModalConceptsProps {
  isActive?: boolean
  selectedConcept: any
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
  showModal: boolean,
  getTableCompanies: any
}

export const ModalEditConcepts: React.FC<ModalConceptsProps> = ({
  showModal,
  setShowModal,
  isActive,
  selectedConcept,
  getTableCompanies
}) => {
  const { formState, reset, handleSubmit, register } = useForm<ConceptsFormValues>({
    resolver: zodResolver(modalConceptsFormSchema)
  })
  const { errors } = formState

  const defaultOptions = {
    Nature: getDefaultSelectOption({}, 'Naturaleza'),
    Concepts: getDefaultSelectOption({}, 'Concepto Flujo de Caja')
  }

  const[value,setValue]=useState(0)
  const[name,setName]=useState(selectedConcept.name)
  const selects = useAccountsSelects()

  const { cashFlowConcept, natureTypes } = selects
  const onClose = () => {
    setShowModal(false)
    reset()
  }

  const onSuccess = async (values: ConceptsFormValues): Promise<void> => {
    try {
      console.log(values)
      if (selectedConcept !== null) {
        await updateConcepts(selectedConcept.id, { ...values, isActive })
      }
      onClose()
      getTableCompanies()
    } catch (error) {
      console.log(error)
      onClose()
    }
  }

  return (
    <ModalFormStyle
      dataModalForm={{
        firstTitle: 'Del Concepto',
        secondTitle: 'Editar información',
        description: 'Diligenciar todos los campos que quieres editar'
      }}
      onClose={onClose}
      showModal={showModal}
    >
      <form onSubmit={handleSubmit(onSuccess)}>
        <div className='space-y-3'>
          <div className='relative w-full'>
            <InputField
              className='bg-transparent text-lg w-full'
              defaultValue={selectedConcept.id}
              disabled
              placeholder='0000000'
            />
            <span className='absolute text-lg top-2 left-3 icon-key text-primaryText-50' />
          </div>
          <div className='relative'>
            <InputField
              className='bg-transparent text-lg'
              error={errors.name?.message}
              {...register('name')}
              placeholder='Nombre concepto'
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

          <div className='relative'>
            <SelectField
              {...register('natureTypeId')}
              className='bg-transparent text-lg text-primaryText-50 '
              error={errors.natureTypeId?.message}
              options={[defaultOptions.Nature, ...natureTypes]}
            />
            <span className='absolute text-lg top-2 left-3 icon-file-lines text-primaryText-50' />
          </div>
          <div className='relative'>


            <SelectField
              {...register('cashFlowConceptId')}
              className='bg-transparent text-lg text-primaryText-50 '
              error={errors.cashFlowConceptId?.message}
              options={[defaultOptions.Concepts, ...cashFlowConcept]}
            />
            <span className='absolute text-lg top-2 left-3 icon-file-lines text-primaryText-50' />
          </div>

          <div className='flex sm:justify-end'>
            <Button
              className='bg-secondary w-full sm:w-52 h-12 mt-3 button'
              rounded='2xl'
              type='submit'
            >
              <span className='z-10 icon-check left-4' />
              <span className='z-10'>Editar</span>
            </Button>
          </div>
        </div>
      </form>
    </ModalFormStyle>
  )
}