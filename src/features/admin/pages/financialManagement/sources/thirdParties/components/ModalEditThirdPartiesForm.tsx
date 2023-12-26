import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import {
  modalThirdPartiesFormSchema,
  type ThirdPartiesFormValues
} from '@/features/admin/schemas/thirdParties/thirdParties'
import { Button } from '@/features/common/components/ui/Button'
import { InputField } from '@/features/common/components/ui/Form'
import { ModalFormStyle } from '@/features/common/components/ui/Modal/modalStyle/ModalFormStyle'
import { updateThirdParties, Datum } from '../services/thirdPartiesService'
import { useState } from 'react'

interface ModalThirdPartiesProps {
  showModal: boolean
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
  selectedThirdParties: Datum | null
  isActive: boolean
  getDataTable: any
}

export const ModalEditThirdPartiesForm: React.FC<ModalThirdPartiesProps> = ({
  showModal,
  setShowModal,
  selectedThirdParties,
  isActive,
  getDataTable
}) => {
  const { formState, reset, handleSubmit, register } = useForm<ThirdPartiesFormValues>({
    resolver: zodResolver(modalThirdPartiesFormSchema)
  })
  const { errors } = formState

  const [value, setValue] = useState(0)
  const [name, setName] = useState(selectedThirdParties?.name)
  const [withholdings, setWithholdings] = useState(selectedThirdParties?.withholdings)
  const [nit, setNit] = useState(selectedThirdParties?.nit)
  const [reteICA, setReteICA] = useState(selectedThirdParties?.ica)

  const onClose = () => {
    setShowModal(false)
    reset()
    getDataTable()
  }

  const onSuccess = async (values: ThirdPartiesFormValues): Promise<void> => {
    const numericValues = {
      ...values,
      withholdings: parseFloat(values.withholdings),
      ica: parseFloat(values.ica)
    }
    try {
      if (selectedThirdParties !== null) {
        await updateThirdParties(selectedThirdParties.id, { ...numericValues, isActive })
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
        firstTitle: 'Tercero',
        secondTitle: 'Editar Información',
        description: 'Diligenciar todos los campos que quiere editar'
      }}
      onClose={onClose}
      showModal={showModal}
    >
      <form onSubmit={handleSubmit(onSuccess)}>
        <div className='space-y-3'>
          <div className='grid grid-cols-2 gap-2'>
            <div className='relative'>
              <InputField
                className='bg-transparent text-lg w-full'
                defaultValue={selectedThirdParties?.code}
                disabled
                placeholder='0000000'
              />
              <span className='absolute text-lg top-2 left-3 icon-key text-primaryText-50' />
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
                  const soloNumeros = /^[0-9]+$/.test(event.target.value)
                  if (event.cancelable || soloNumeros && event.target.value.length >= 0 && event.target.value.length <= 4) {
                    setWithholdings(parseInt(event.target.value))
                  }
                  if (event.target.value.length <= value) {
                    setValue(event.target.value.length)
                    setWithholdings(parseInt(event.target.value))
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
                    setReteICA(parseInt(event.target.value))
                  }
                  if (event.target.value.length <= value) {
                    setValue(event.target.value.length)
                    setReteICA(parseInt(event.target.value))
                  }
                }}
              />
              <span className='absolute text-lg top-2 left-3 icon-percent text-primaryText-50' />
            </div>
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
    </ModalFormStyle >
  )
}
