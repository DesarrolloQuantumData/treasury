import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { type BankFormValues, modalBankFormSchema } from '@/features/admin/schemas/bank/bankSchemas'
import { Button } from '@/features/common/components/ui/Button'
import { InputField } from '@/features/common/components/ui/Form'
import { ModalFormStyle } from '@/features/common/components/ui/Modal/modalStyle/ModalFormStyle'

import { updateBanks } from '../services/bankService'
import { useState } from 'react'

interface ModalBanksProps {
  showModal: boolean
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
  selectedBank: any | null
  isActive: boolean
  getListBanks: any
}

export const ModalEditBanksForm: React.FC<ModalBanksProps> = ({
  showModal,
  setShowModal,
  selectedBank,
  isActive,
  getListBanks,
}) => {
  const { formState, reset, handleSubmit, register } = useForm<BankFormValues>({
    resolver: zodResolver(modalBankFormSchema)
  })
  const { errors } = formState

  const [value, setValue] = useState(0)
  const [nit, setNit] = useState(selectedBank.nit)
  const [code, setCode] = useState(selectedBank.code)
  const [name, setName] = useState(selectedBank.name)
  const [nameConventionFile, setNameConventionFile] = useState(selectedBank.nameConventionFile)

  const onClose = () => {
    setShowModal(false)
    reset()
    getListBanks()
  }

  const onSuccess = async (values: BankFormValues): Promise<void> => {
    try {
      if (selectedBank !== null) {
        await updateBanks(selectedBank.id, { ...values, isActive })
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
        firstTitle: 'Novedad Banco/Fuente',
        secondTitle: 'Editar información',
        description: 'Diligenciar todos los campos que quiere editar'
      }}
      onClose={onClose}
      showModal={showModal}
    >
      <form onSubmit={handleSubmit(onSuccess)}>
        <div className='space-y-3'>
          <div className='relative w-full'>
            <InputField
              className='bg-transparent text-lg w-full pl-10'
              defaultValue={selectedBank.id}
              disabled
              placeholder='0000000'
            />
            <span className='absolute text-lg top-2 left-3 icon-key text-primaryText-50' />
          </div>
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
                if (soloNumeros && event.target.value.length >= 0 && event.target.value.length <= 10) {
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
                {...register('nit')}
                className='bg-transparent text-lg pl-10'
                placeholder='NIT'
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
