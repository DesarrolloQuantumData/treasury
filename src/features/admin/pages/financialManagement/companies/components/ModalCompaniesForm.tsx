import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import type { CompaniesFormValues } from '@/features/admin/schemas/companies/companiesSchema'
import { modalCompaniesFormSchema } from '@/features/admin/schemas/companies/companiesSchema'
import { Button } from '@/features/common/components/ui/Button'
import { InputField } from '@/features/common/components/ui/Form'
import { ModalFormStyle } from '@/features/common/components/ui/Modal/modalStyle/ModalFormStyle'

import { newCompany } from '../services/companyService'

interface ModalCompaniesProps {
  showModal: boolean
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const ModalCompaniesForm: React.FC<ModalCompaniesProps> = ({ showModal, setShowModal }) => {
  const [isSuccesfull, setIsSuccesfull] = useState(false)
  const { formState, reset, handleSubmit, register } = useForm<CompaniesFormValues>({
    resolver: zodResolver(modalCompaniesFormSchema)
  })
  const { errors } = formState
  const [value, setValue] = useState(0)
  const [nit, setNit] = useState("")
  const [fullName, setFullName] = useState("")
  const [shortName, setShortName] = useState("")

  const onClose = () => {
    setShowModal(false)
    setIsSuccesfull(false)
    setValue(0)
    setNit("")
    setFullName("")
    setShortName("")
    reset()
  }

  const onSuccess = async (values: CompaniesFormValues) => {
    try {
      newCompany({ ...values })
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
            firstTitle: 'Crear',
            secondTitle: 'Nueva empresa',
            description: 'Diligenciar todos los campos, para añadir un nuevo registro'
          }
          : {
            description: 'El nuevo registro se ha creado exitosamente',
            secondTitle: 'Nueva empresa',
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
                {...register('nit')}
                className='bg-transparent text-lg w-full'
                error={errors.nit?.message}
                placeholder='NIT'
                value={nit}
                onChange={(event) => {
                  const soloNumeros = /^[0-9]+$/.test(event.target.value);
                  if (event.cancelable || soloNumeros && event.target.value.length >= 0 && event.target.value.length <= 20) {
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
                {...register('shortName')}
                className='bg-transparent text-lg'
                error={errors.shortName?.message}
                placeholder='Abreviación Empresa'
                type='text'
                value={shortName}
                onChange={(event) => {
                  if (event.target.value.length >= 0 && event.target.value.length <= 3) {
                    setShortName(event.target.value.toUpperCase());
                  }
                  if (event.target.value.length <= value) {
                    setValue(event.target.value.length)
                    setNit(event.target.value)
                  }
                }}
              />
              <span className='absolute text-lg top-2 left-3 icon-file-pen text-primaryText-50' />
            </div>

            <div className='relative'>
              <InputField
                {...register('fullName')}
                className='bg-slate-200 text-lg border-primary-500'
                error={errors.fullName?.message}
                placeholder='Nombre empresa'
                type='text'
                value={fullName}
                onChange={(event) => {
                  if (event.target.value.length >= 0 && event.target.value.length <= 50) {
                    setFullName(event.target.value.toUpperCase());
                    if (event.target.value.length <= value) {
                      setValue(event.target.value.length)
                      setFullName(event.target.value)
                    }
                  }
                }}
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
