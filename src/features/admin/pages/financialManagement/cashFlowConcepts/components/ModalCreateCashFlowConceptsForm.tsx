import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

import type { cashFlowConceptsFormValues } from '@/features/admin/schemas/cashFlowConcepts/cashFlowConceptsSchema'
import { modalCashFlowConceptsSchema } from '@/features/admin/schemas/cashFlowConcepts/cashFlowConceptsSchema'
import { Button } from '@/features/common/components/ui/Button'
import { InputField } from '@/features/common/components/ui/Form'
import { SelectField } from '@/features/common/components/ui/Form/SelectField'
import { ModalFormStyle } from '@/features/common/components/ui/Modal/modalStyle/ModalFormStyle'
import { getDefaultSelectOption } from '@/features/common/utils/defaults'
import { useAccountsSelects } from '../../concepts/components/accountsForm/useAccountsSelects'

import {
  createCashFlowConcepts,
  type GetNatureTypesList
} from '../services/cashFlowConceptsServices'


interface ModalCashFlowConceptsProps {
  showModal: boolean
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const ModalCreateCashFlowConceptsForm: React.FC<ModalCashFlowConceptsProps> = ({
  showModal,
  setShowModal
}) => {
  const { formState, reset, handleSubmit, register } = useForm<cashFlowConceptsFormValues>({
    resolver: zodResolver(modalCashFlowConceptsSchema)
  })
  const selects = useAccountsSelects()

  const { natureTypes } = selects
  const defaultOption = {accountType: getDefaultSelectOption({}, 'Naturaleza')}

  const[value,setValue]=useState(0)
  const[name,setName]=useState("")
  const [isSuccesfull, setIsSuccesfull] = useState(false)
  const { errors } = formState

  const onClose = () => {
    setShowModal(false)
    reset()
  }

  const onSuccess = async (values: cashFlowConceptsFormValues): Promise<void> => {
    try {
        const response= await createCashFlowConcepts(values)
        console.log(response.value)
        setIsSuccesfull(true)
    } catch (error) {
      console.log(error)
      onClose()
    }
  }
  return (
    <ModalFormStyle
      dataModalForm={
        !isSuccesfull
          ? {
            firstTitle: 'Crear nuevo',
            secondTitle: 'Concepto FDC',
            description: 'Diligenciar todos los campos, para añadir un nuevo registro'
          }
          : {
            description: 'El nuevo registro se ha creado exitosamente',
            secondTitle: 'Concepto FDC',
            firstTitle: 'Crear'
          }
      }
      onClose={onClose}
      showModal={showModal}
    >
      {!isSuccesfull ? (
       <form onSubmit={handleSubmit(onSuccess)}>
          <div className='space-y-3'>
            <div className='relative w-full'>
              <InputField
                {...register('name')}
                className='bg-transparent text-lg'
                error={errors.name?.message}
                placeholder='Concepto Flujo de caja'
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
      ) : (
        <div className='flex sm:justify-end'>
          <Button
            color='secondary'
            onClick={() => {
              setIsSuccesfull(false)
              onClose()
            }}
          >
            Aceptar
          </Button>
        </div>
      )}
    </ModalFormStyle>
  )
}
