import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/features/common/components/ui/Button'
import { InputField, SelectField } from '@/features/common/components/ui/Form'
import { useAccountsSelects } from '../../../financialManagement/accounts/components/accountsForm/useAccountsSelects'
import { getDefaultSelectOption } from '@/features/common/utils/defaults'
import { ModalFormStyle } from '@/features/common/components/ui/Modal/modalStyle/ModalFormStyle'
import { modalBankBalanceSchema } from '@/features/admin/schemas/BankBalance/BankBalanceSchema'
import type { BankBalanceFormValues } from '@/features/admin/schemas/BankBalance/BankBalanceSchema'
import { Paperclip } from 'tabler-icons-react'
import { newBankBalance, newUploapFiles } from '../services/BankBalanceServices'

interface ModalCompaniesProps {
  showModal: boolean
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
  user_Id: any
}

export const ModalBankBalanceForm: React.FC<ModalCompaniesProps> = ({ showModal, setShowModal, user_Id }) => {
  const [isSuccessful, setIsSuccessful] = useState(false)
  const { formState, reset, handleSubmit, register } = useForm<BankBalanceFormValues>({
    resolver: zodResolver(modalBankBalanceSchema)
  })
  const [file, setFile] = useState<File[] | null>(null)
  const [date, setDate] = useState(Date)
  const [registeredType, setRegisteredType] = useState("Archivo plano")
  const selects = useAccountsSelects()

  const [alertModal, setAlertModal] = useState(false)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  const { bankName, companyName, accounts } = selects
  const defaultOptions = {
    Company: getDefaultSelectOption({ valueAsNumber: true }, 'Empresa'),
    Bank: getDefaultSelectOption({ valueAsNumber: true }, 'Banco'),
    Account: getDefaultSelectOption({ valueAsNumber: true }, 'Cuenta'),
  }
  const { errors } = formState

  const onClose = () => {
    setShowModal(false)
    setIsSuccessful(false)
    reset()
  };

  const onSuccess = async (values: BankBalanceFormValues) => {
    try {
      const response = await newUploapFiles(file)
      if (response.value != "") {
        await newBankBalance({
          ...values, fileName: response.value, registeredType: registeredType,
          userId: user_Id
        })
      }
      if (response.status == "ERROR") {
        setTitle("Error")
        setContent(response.value)
        setAlertModal(true)
      }
      else {
        setIsSuccessful(true)
      }
    } catch (error) {
      console.log(error)
      onClose()
    }
  }

  useEffect(() => {
    setInterval(() => {
      const fechaActual = new Date()
      const dia = fechaActual.getDate()
      const mes = fechaActual.getMonth() + 1
      const año = fechaActual.getFullYear()
      setDate(`${dia}/${mes}/${año}`)
    }, 1000)
  }, [])

  return (
    <>
      <ModalFormStyle
        dataModalForm={
          !isSuccessful
            ? {
              firstTitle: 'Crear',
              secondTitle: 'Nueva empresa',
              description: 'Diligenciar todos los campos, para añadir un nuevo registro',
            }
            : {
              description: 'El nuevo registro se ha creado exitosamente',
              secondTitle: 'Nueva empresa',
              firstTitle: 'Crear',
            }
        }
        onClose={onClose}
        showModal={showModal}
      >
        {!isSuccessful ? (
          <form onSubmit={handleSubmit(onSuccess)}>
            <div className='space-y-3'>
              <div className='relative '>
                <InputField
                  style={{ pointerEvents: 'none' }}
                  value={date}
                />
                <span className='absolute text-lg top-2 left-3 font-bold icon-hashtag text-primaryText-50' />
              </div>
              <div className='flex flex-col sm:flex-row gap-4 w-full sm:max-w-lg'>
                <div className='relative w-full sm:w-1/2'>
                  <SelectField
                    {...register('companyId')}
                    className='bg-transparent text-lg text-primaryText-50'
                    error={errors.companyId?.message}
                    options={[defaultOptions.Company, ...companyName]}
                  />
                  <span className='absolute text-lg top-2 left-3 font-bold icon-hashtag text-primaryText-50' />
                </div>
                <div className='relative w-full sm:w-1/2'>
                  <SelectField
                    {...register('bankId')}
                    className='bg-transparent text-lg text-primaryText-50'
                    error={errors.bankId?.message}
                    options={[defaultOptions.Bank, ...bankName]}
                  />
                  <span className='absolute text-lg top-2 left-3 font-bold icon-hashtag text-primaryText-50' />
                </div>
              </div>
              <div className='relative '>
                <SelectField
                  {...register('accountId')}
                  className='bg-transparent text-lg text-primaryText-50'
                  error={errors.accountId?.message}
                  options={[defaultOptions.Account, ...accounts]}
                />
                <span className='absolute text-lg top-2 left-3 font-bold icon-hashtag text-primaryText-50' />
              </div>
              <div className='relative '>
                <InputField placeholder='Descripción'
                  {...register('description')}
                  error={errors.description?.message}
                />
                <span className='absolute text-lg top-2 left-3 font-bold icon-hashtag text-primaryText-50' />
              </div>
              <div className='relative grid justify-items-center'>
                <div className='flex gap-2 my-1'>
                  <label>
                    <div>
                      <Paperclip aria-label='Adjuntar archivo' className='text-primary' size="20" />
                      <input
                        accept='application/pdf, image/png, image/jpeg'
                        className='hidden'
                        multiple
                        type='file'
                        onChange={async (e) => {
                          try {
                            if (e.target.files) {
                              const files = [...e.target.files]
                              setFile(files)
                              e.target.value = ''
                            }
                          } catch (error) {
                            console.log(error)
                          }
                        }}
                      />
                    </div>
                  </label>
                </div>
                <label>Cargar Archivo</label>
              </div>
            </div>
            <div className='flex sm:justify-end'>
              <Button className='bg-secondary w-full sm:w-52 h-12 mt-3' rounded='2xl' type='submit'>
                <span className='z-10 icon-check left-4' />
                <span className='z-10'>Crear</span>
              </Button>
            </div>
          </form>
        ) : (
          <div className='flex sm:justify-end'>
            <Button color='secondary'
              onClick={() => {
                setIsSuccessful(false)
                onClose()
              }}>
              Aceptar
            </Button>
          </div>
        )}
      </ModalFormStyle>
      <ModalFormStyle
        dataModalForm={
          {
            firstTitle: title,
            secondTitle: content,
          }
        }
        onClose={() => {
          setAlertModal(false)
        }}
        showModal={alertModal}
      >
        <div className='flex sm:justify-end'>
          <Button color='secondary' onClick={() => {
            setAlertModal(false)
          }}>
            Aceptar
          </Button>
        </div>
      </ModalFormStyle>
    </>
  );
};