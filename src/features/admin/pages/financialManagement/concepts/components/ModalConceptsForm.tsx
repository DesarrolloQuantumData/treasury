import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

import type { ConceptsFormValues } from '@/features/admin/schemas/concepts/conceptsSchema'
import { modalConceptsFormSchema } from '@/features/admin/schemas/concepts/conceptsSchema'
import { Button } from '@/features/common/components/ui/Button'
import { InputField } from '@/features/common/components/ui/Form'
import { SelectField } from '@/features/common/components/ui/Form/SelectField'
import { ModalFormStyle } from '@/features/common/components/ui/Modal/modalStyle/ModalFormStyle'
import { createConcepts } from '../services/ConceptsServices'
import { getDefaultSelectOption } from '@/features/common/utils/defaults'
import { useAccountsSelects } from './accountsForm/useAccountsSelects'

interface ModalConceptsProps {
  showModal: boolean
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const ModalConceptsForm: React.FC<ModalConceptsProps> = ({ showModal, setShowModal }) => {
  const { formState, reset, handleSubmit, register } = useForm<ConceptsFormValues>({
    resolver: zodResolver(modalConceptsFormSchema)
  })
  const [isSuccesfull, setIsSuccesfull] = useState(false)
  const { errors } = formState

  const defaultOptions = {
    Nature: getDefaultSelectOption({}, 'Naturaleza'),
    Concepts: getDefaultSelectOption({}, 'Concepto Flujo de Caja')
  }

  const selects = useAccountsSelects()
  const[value,setValue]=useState(0)
  const[name,setName]=useState("")

  const { cashFlowConcept, natureTypes } = selects

  const onClose = () => {
    setShowModal(false)
    reset()
  }

  const onSuccess = async (Body: ConceptsFormValues) => {
    try {
      await createConcepts(Body)
      setIsSuccesfull(true)
    } catch (error) {
      console.log(error)
      onClose()
    }
  }

  return (
    <ModalFormStyle
      dataModalForm={!isSuccesfull
        ? {
          firstTitle: 'Crear',
          secondTitle: 'Nuevo Concepto',
          description: 'Diligenciar todos los campos, para añadir un nuevo registro'
        } : {
          description: 'El nuevo registro se ha creado exitosamente',
          secondTitle: 'Concepto',
          firstTitle: 'Crear'
        }
      }
      onClose={onClose}
      showModal={showModal}
    >
      {!isSuccesfull ? (
        <form onSubmit={handleSubmit(onSuccess)}>
          <div className='space-y-3'>
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
                error={errors.cashFlowConceptId?.message}
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
                onChange={async (event: React.ChangeEvent<HTMLSelectElement>) => {
                  console.log(event.target.value)
                }
                }
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
