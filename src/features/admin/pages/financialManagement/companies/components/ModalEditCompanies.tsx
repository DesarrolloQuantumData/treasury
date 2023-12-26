import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import type { CompaniesFormValues } from '@/features/admin/schemas/companies/companiesSchema'
import { modalCompaniesFormSchema } from '@/features/admin/schemas/companies/companiesSchema'
import { Button } from '@/features/common/components/ui/Button'
import { InputField } from '@/features/common/components/ui/Form'
import { ModalFormStyle } from '@/features/common/components/ui/Modal/modalStyle/ModalFormStyle'

import { updateCompany } from '../services/companyService'
import { useState } from 'react'

interface ModalCompaniesProps {
  isActive?: boolean
  selectedCompany: any
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
  showModal: boolean,
  getTableCompanies: any
}

export const ModalEditCompanies: React.FC<ModalCompaniesProps> = ({
  showModal,
  setShowModal,
  isActive,
  selectedCompany,
  getTableCompanies,
}) => {
  const { formState, reset, handleSubmit, register } = useForm<CompaniesFormValues>({
    resolver: zodResolver(modalCompaniesFormSchema)
  })
  const { errors } = formState
  const [value, setValue] = useState(0)
  const [nit, setNit] = useState(selectedCompany?.nit)
  const [fullName, setFullName] = useState(selectedCompany?.fullName)
  const [shortName, setShortName] = useState(selectedCompany?.shortName)
  const onClose = () => {
    setShowModal(false)
    reset()
  }

  const onSuccess = async (values: CompaniesFormValues): Promise<void> => {
    try {
      if (selectedCompany !== null) {
        await updateCompany(selectedCompany.id, { ...values, isActive })
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
        firstTitle: 'Editar información',
        secondTitle: 'de la empresa',
        description: 'Diligenciar todos los campos que quieres editar'
      }}
      onClose={onClose}
      showModal={showModal}
    >
      <form onSubmit={handleSubmit(onSuccess)}>
        <div className='space-y-3'>
          <div className='relative'>
            <InputField
              {...register('nit')}
              className='bg-slate-200 text-lg border-primary-500'
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
            <span className='absolute text-lg top-2 left-3 font-bold icon-hashtag text-secondary' />
          </div>

          <div className='relative'>
            <InputField
              {...register('shortName')}
              className='bg-slate-200 text-lg border-primary-500'
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
                  setShortName(event.target.value)
                }
              }}
            />
            <span className='absolute text-lg top-2 left-3 icon-file-pen text-secondary' />
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
            <span className='absolute text-lg top-2 left-3 icon-file-lines text-secondary' />
          </div>

          <div className='flex sm:justify-end'>
            <Button
              className='bg-secondary w-full sm:w-52 h-12 mt-3 button'
              rounded='2xl'
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
