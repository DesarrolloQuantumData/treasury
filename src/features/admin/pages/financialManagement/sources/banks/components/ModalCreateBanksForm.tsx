import React, { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { type BankFormValues, modalBankFormSchema } from '@/features/admin/schemas/bank/bankSchemas'
import { Button } from '@/features/common/components/ui/Button'
import { InputField } from '@/features/common/components/ui/Form'
import { ModalFormStyle } from '@/features/common/components/ui/Modal/modalStyle/ModalFormStyle'

import { createBanks } from '../services/bankService'

interface ModalBanksProps {
  showModal: boolean
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const ModalCreateBanksForm: React.FC<ModalBanksProps> = ({ showModal, setShowModal }) => {
  const { formState, reset, handleSubmit, register } = useForm<BankFormValues>({
    resolver: zodResolver(modalBankFormSchema)
  })

  const [value, setValue] = useState(0)
  const [code, setCode] = useState("")
  const [name, setName] = useState("")
  const [nameConventionFile, setNameConventionFile] = useState("")
  const [nit, setNit] = useState("")
  const [isSuccesfull, setIsSuccesfull] = useState(false)
  const { errors } = formState

  const onClose = () => {
    setShowModal(false)
    reset()
    setNit("")
    setCode("")
    setName("")
    setNameConventionFile("")
  }

  const onSuccess = async (values: BankFormValues): Promise<void> => {
    try {
      await createBanks(values)
      setIsSuccesfull(true)
    } catch (error) {
      console.log(error)
      onClose()
    }
  }

  return (
    <ModalFormStyle
      dataModalForm={!isSuccesfull ? {
        firstTitle: 'Crear Nuevo',
        secondTitle: 'Banco/ Fuente',
        description: 'Diligenciar todos los campos, para añadir un nuevo registro'
      }
        : {
          description: 'El nuevo registro se ha creado exitosamente',
          secondTitle: 'Banco/ Fuente',
          firstTitle: 'Crear'
        }}
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
                  const numbers = /^[0-9]+$/.test(event.target.value);
                  if (numbers && event.target.value.length >= 0 && event.target.value.length <= 4) {
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
                    const numbers = /^[0-9]+$/.test(event.target.value);
                    if (numbers && event.target.value.length >= 0 && event.target.value.length <= 15) {
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
                  {...register('nameConventionFile')}
                  className='bg-transparent text-lg pl-10'
                  error={errors.nameConventionFile?.message}
                  placeholder='Convención archivos'
                  type='text'
                  value={nameConventionFile}
                  onChange={(event) => {
                    if (event.target.value.length >= 0 && event.target.value.length <= 20) {
                      const array = event.target.value.split(' ')
                      if (array.length == 1) {
                        setNameConventionFile(event.target.value.replace(/\b\w/g, (match) => match.toUpperCase()));
                      } else {
                        setNameConventionFile(event.target.value);
                      }
                    }
                    if (event.target.value.length <= value) {
                      setValue(event.target.value.length)
                      setNameConventionFile(event.target.value)
                    }
                  }}
                />
                <span className='absolute text-lg top-2 left-3 icon-file-lines text-primaryText-50' />
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
        </form>)
        : (
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
