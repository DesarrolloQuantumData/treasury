import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

import type { InterfacesFormValues } from '@/features/admin/schemas/interfaces/interfacesSchema'
import { modalInterfacesFormSchema } from '@/features/admin/schemas/interfaces/interfacesSchema'
import { Button } from '@/features/common/components/ui/Button'
import { InputField } from '@/features/common/components/ui/Form'
import { SelectField } from '@/features/common/components/ui/Form/SelectField'
import { ModalFormStyle } from '@/features/common/components/ui/Modal/modalStyle/ModalFormStyle'
import { createInterfaces } from '../services/interfaceService'
import { getDefaultSelectOption } from '@/features/common/utils/defaults'
import { useAccountsSelects } from '../components/accountsForm/useAccountsSelects'

interface ModalinterfacesProps {
  showModal: boolean
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}



export const ModalInterfacesForm: React.FC<ModalinterfacesProps> = ({
  showModal,
  setShowModal
}) => {
  const { formState, reset, handleSubmit, register } = useForm<InterfacesFormValues>({
    resolver: zodResolver(modalInterfacesFormSchema)
  })

  const defaultOptions = {
    typeOfFile: getDefaultSelectOption({ valueAsNumber: true }, 'Tipo Archivo'),
    typeSeparator: getDefaultSelectOption({ valueAsNumber: true }, 'Tipo Separador'),
    bankName: getDefaultSelectOption({ valueAsNumber: true }, '--Banco--'),
  }
  const selects = useAccountsSelects()

  const { typeOfFile, typeSeparator, bankName } = selects
  const [isSuccesfull, setIsSuccesfull] = useState(false)
  const { errors } = formState
  const [description, setDescription] = useState("")
  const [numberLinesHeader, setNumberLinesHeader] = useState("")
  const [numberFinalLines, setNumberFinalLines] = useState("")
  const [value, setValue] = useState(0)

  const onClose = () => {
    setShowModal(false)
    reset()
    setDescription("")
    setNumberLinesHeader("")
    setNumberFinalLines("")
  }

  const onSuccess = async (values: InterfacesFormValues) => {
    try {
      await createInterfaces(values)
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
          secondTitle: 'Nueva Interface',
          description: 'Diligenciar todos los campos, para añadir un nuevo registro'
        } : {
          description: 'El nuevo registro se ha creado exitosamente',
          secondTitle: 'Interface',
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
                error={errors.Description?.message}
                {...register('Description')}
                placeholder='Descripción'
                type='text'
                value={description}
                onChange={(event) => {
                  if (event.target.value.length >= 0 && event.target.value.length <= 15) {
                    const array = event.target.value.split(' ')
                    if (array.length == 1) {
                      setDescription(event.target.value.replace(/\b\w/g, (match) => match.toUpperCase()));
                    } else {
                      setDescription(event.target.value);
                    }
                  }
                  if (event.target.value.length <= value) {
                    setValue(event.target.value.length)
                    setDescription(event.target.value)
                  }
                }}
              />
              <span className='absolute text-lg top-2 left-3 icon-file-pen text-primaryText-50' />
            </div>

            <div className='relative'>
              <SelectField
                {...register('FileTypeId')}
                className='bg-transparent text-lg text-primaryText-50'
                error={errors.FileTypeId?.message}
                options={[defaultOptions.typeOfFile, ...typeOfFile]}
              />
              <span className='absolute text-lg top-2 left-3 icon-file-pen text-primaryText-50' />
            </div>
            <div className='relative'>
              <InputField
                className='bg-transparent text-lg'
                error={errors.NumberLinesHeader?.message}
                {...register('NumberLinesHeader')}
                placeholder='Cant. Líneas encabezado'
                type='text'
                value={numberLinesHeader}
                onChange={(event) => {
                  const soloNumeros = /^[0-9]+$/.test(event.target.value);
                  if (event.cancelable || soloNumeros && event.target.value.length >= 0 && event.target.value.length <= 2) {
                    setNumberLinesHeader(event.target.value);
                  }
                  if (event.target.value.length <= value) {
                    setValue(event.target.value.length)
                    setNumberLinesHeader(event.target.value)
                  }
                }}
              />
              <span className='absolute text-lg top-2 left-3 icon-file-pen text-primaryText-50' />
            </div>
            <div className='relative'>
              <InputField
                className='bg-transparent text-lg'
                error={errors.NumberFinalLines?.message}
                {...register('NumberFinalLines')}
                placeholder='Cant. Líneas finales'
                type='text'
                value={numberFinalLines}
                onChange={(event) => {
                  const soloNumeros = /^[0-9]+$/.test(event.target.value);
                  if (event.cancelable || soloNumeros && event.target.value.length >= 0 && event.target.value.length <= 2) {
                    setNumberFinalLines(event.target.value);
                  }
                  if (event.target.value.length <= value) {
                    setValue(event.target.value.length)
                    setNumberFinalLines(event.target.value)
                  }
                }}
              />
              <span className='absolute text-lg top-2 left-3 icon-file-pen text-primaryText-50' />
            </div>
            <div className='relative'>
              <SelectField
                {...register('SeparatorTypeId')}
                className='bg-transparent text-lg text-primaryText-50'
                error={errors.SeparatorTypeId?.message}
                options={[defaultOptions.typeSeparator, ...typeSeparator]}
              />
              <span className='absolute text-lg top-2 left-3 icon-file-pen text-primaryText-50' />
            </div>
            <div className='relative'>
              <SelectField
                {...register('BankId')}
                className='bg-transparent text-lg text-primaryText-50'
                error={errors.BankId?.message}
                options={[defaultOptions.bankName, ...bankName]}
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
