import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import {
  modalThirdPartiesFormSchema,
  type ThirdPartiesFormValues
} from '@/features/admin/schemas/thirdParties/thirdParties'
import { Button } from '@/features/common/components/ui/Button'
import { InputField } from '@/features/common/components/ui/Form'
import { ModalFormStyle } from '@/features/common/components/ui/Modal/modalStyle/ModalFormStyle'
import { useState } from 'react'
import { createThirdParties } from '../services/thirdPartiesService'

interface ModalThirdPartiesProps {
  showModal: boolean
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const ModalCreateThirdPartiesForm: React.FC<ModalThirdPartiesProps> = ({
  showModal,
  setShowModal
}) => {
  const { formState, reset, handleSubmit, register } = useForm<ThirdPartiesFormValues>({
    resolver: zodResolver(modalThirdPartiesFormSchema)
  })

  const [isSuccesfull, setIsSuccesfull] = useState(false)
  const { errors } = formState
  const [value, setValue] = useState(0)
  const [code, setCode] = useState("")
  const [name, setName] = useState("")
  const [withholdings, setWithholdings] = useState("")
  const [nit, setNit] = useState("")
  const [reteICA, setReteICA] = useState("")
  const onClose = () => {
    setShowModal(false)
    setIsSuccesfull(false)
    reset()
  }

  const onSuccess = async (values: ThirdPartiesFormValues): Promise<void> => {
    try {
      await createThirdParties(values)
      setIsSuccesfull(true)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ModalFormStyle
      dataModalForm={
        !isSuccesfull
          ? {
            firstTitle: 'Crear Nuevo',
            secondTitle: 'Tercero',
            description: 'Diligenciar todos los campos, para añadir un nuevo registro'
          }
          : {
            description: 'El nuevo registro se ha creado exitosamente',
            secondTitle: 'Tercero'
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
                {...register('code')}
                className='bg-transparent text-lg pl-10'
                error={errors.code?.message}
                placeholder='Código'
                type='text'
                value={code}
                onChange={(event) => {
                  const soloNumeros = /^[0-9]+$/.test(event.target.value);
                  if (event.cancelable || soloNumeros && event.target.value.length >= 0 && event.target.value.length <= 4) {
                    setCode(event.target.value);
                  }
                  if (event.target.value.length <= value) {
                    setValue(event.target.value.length)
                    setCode(event.target.value)
                  }
                }}
              />
              <span className='absolute text-lg top-2 left-3 font-bold icon-hashtag text-primaryText-50' />
            </div>
            <div className='relative'>
              <InputField
                {...register('name')}
                className='bg-transparent text-lg pl-10'
                error={errors.name?.message}
                placeholder='Nombre'
                type='text'
                value={name}
                onChange={(event) => {
                  if (event.target.value.length >= 0 && event.target.value.length <= 50) {
                    setName(event.target.value.toUpperCase());
                  }
                  if (event.target.value.length <= value) {
                    setValue(event.target.value.length)
                    setName(event.target.value)
                  }
                }}
              />
              <span className='absolute text-lg top-2 left-3 icon-file-pen text-primaryText-50' />
            </div>
            <div className='flex gap-2'>
              <div className='relative'>
                <InputField
                  className='bg-transparent text-lg pl-10'
                  placeholder='NIT'
                  {...register('nit')}
                  error={errors.nit?.message}
                  type='text'
                  value={nit}
                  onChange={(event) => {
                    const soloNumeros = /^[0-9]+$/.test(event.target.value);
                    if (event.cancelable || soloNumeros && event.target.value.length >= 0 && event.target.value.length <= 15) {
                      setNit(event.target.value);
                    }
                    if (event.target.value.length <= value) {
                      setValue(event.target.value.length)
                      setNit(event.target.value)
                    }
                  }}
                />
                <span className='absolute text-lg top-2 left-3 font-bold icon-hashtag text-primaryText-50' />
              </div>
              <div className='relative'>
                <InputField
                  {...register('withholdings')}
                  className='bg-transparent text-lg pl-10'
                  error={errors.withholdings?.message}
                  placeholder='ReteFuente'
                  type='text'
                  value={withholdings}
                  onChange={(event) => {
                    const soloNumeros = /^[0-9]+$/.test(event.target.value);
                    if (event.cancelable || soloNumeros && event.target.value.length >= 0 && event.target.value.length <= 4) {
                      setWithholdings(event.target.value);
                    }
                    if (event.target.value.length <= value) {
                      setValue(event.target.value.length)
                      setWithholdings(event.target.value)
                    }
                  }}
                />
                <span className='absolute text-lg top-2 left-3 icon-percent text-primaryText-50' />
              </div>
              <div className='relative'>
                <InputField
                  {...register('ica')}
                  className='bg-transparent text-lg pl-10'
                  error={errors.ica?.message}
                  placeholder='ReteICA'
                  type='text'
                  value={reteICA}
                  onChange={(event) => {
                    const soloNumeros = /^[0-9]+$/.test(event.target.value);
                    if (event.cancelable || soloNumeros && event.target.value.length >= 0 && event.target.value.length <= 4) {
                      setReteICA(event.target.value);
                    }
                    if (event.target.value.length <= value) {
                      setValue(event.target.value.length)
                      setReteICA(event.target.value)
                    }
                  }}
                />
                <span className='absolute text-lg top-2 left-3 icon-percent text-primaryText-50' />
              </div>
            </div>
            <div className='flex sm:justify-end'>
              <Button
                className='bg-secondary z-10 w-full sm:w-52 h-12 mt-3 button'
                rounded='xl'
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
