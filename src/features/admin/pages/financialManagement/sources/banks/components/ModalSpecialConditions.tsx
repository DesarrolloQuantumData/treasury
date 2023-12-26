import React, { useState, useRef, useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { type SpecialConditionsSchemasValues, modalSpecialConditionsSchemas } from '@/features/admin/schemas/bank/specialConditionsSchemas'
import { Button } from '@/features/common/components/ui/Button'
import { InputField } from '@/features/common/components/ui/Form'
import { ModalFormStyle } from '@/features/common/components/ui/Modal/modalStyle/ModalFormStyle'
import { SelectField } from '@/features/common/components/ui/Form/SelectField'
import { NewConditionSpecial, getResponseSpecialCondition, newWetSeal, newProtectorograph, getTypes, ResponseTypes, getCondition, ResponseConditions, ResponseSpecialCondition, uptConditionSpecial } from '../services/bankService'
import { Paperclip } from 'tabler-icons-react'

interface ModalBanksProps {
  showModal: boolean
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
  bankId: any
}

export const ModalSpecialConditions: React.FC<ModalBanksProps> = ({ showModal, setShowModal, bankId }) => {
  const { formState, reset, handleSubmit, register } = useForm<SpecialConditionsSchemasValues>({
    resolver: zodResolver(modalSpecialConditionsSchemas)
  })

  const [types, setTypes] = useState<ResponseTypes[] | null>(null)
  const [isSuccesfull, setIsSuccesfull] = useState(false)
  const [preparerApprove, setPreparerApprove] = useState<ResponseConditions[] | null>(null)
  const [visibility, setVisibility] = useState(false)
  const [conditionSpecial, setConditionSpecial] = useState<ResponseSpecialCondition[] | null>(null)
  const [type, setType] = useState(0)
  const [managerRelationship, setManagerRelationship] = useState("")
  const [relationshipAssistant, setRelationshipAssistant] = useState("")
  const [officeAddress, setOfficeAddress] = useState("")
  const [urlProtectorograph, setUrlProtectorograph] = useState("")
  const [urlWetSeal, setUrlWetSeal] = useState("")
  const [value, setValue] = useState(0)
  const { errors } = formState

  const onClose = () => {
    setShowModal(false)
    reset()
  }

  const options = [
    { id: 1, label: '1' },
    { id: 2, label: '2' },
    { id: 2, label: '3' },
    { id: 2, label: '4' },
    { id: 2, label: '5' },
  ];

  useEffect(() => {
    GetInformation()
  }, [])

  const GetInformation = async () => {
    try {
      const response = await getResponseSpecialCondition({ BankId: bankId })
      setConditionSpecial(response)
      setManagerRelationship(response[0]?.relationshipManager)
      setRelationshipAssistant(response[0]?.relationshipAssistant)
      setOfficeAddress(response[0]?.officeAddress)
      setUrlProtectorograph(response[0]?.protectograph)
      setUrlWetSeal(response[0]?.wetSeal)
      setTypes(await getTypes())
    }
    catch (error) {
      alert(error)
    }
  }

  const onSuccess = async (values: SpecialConditionsSchemasValues): Promise<void> => {
    try {
      if (type !== 0) {
        if (conditionSpecial == null) {
          await NewConditionSpecial({
            specialConditionTypeId: type,
            protectograph: urlProtectorograph,
            wetSeal: urlWetSeal,
            relationshipManager: values.managerRelationship,
            relationshipAssistant: values.relationshipAssistant,
            officeAddress: values.officeAddress,
            numPreparer: values.preparator,
            numApprover: values.approver,
            bankId: bankId
          })
        } else {
          await uptConditionSpecial(conditionSpecial[0]?.id, {
            specialConditionTypeId: type,
            protectograph: urlProtectorograph,
            wetSeal: urlWetSeal,
            relationshipManager: values.managerRelationship,
            relationshipAssistant: values.relationshipAssistant,
            officeAddress: values.officeAddress,
            numPreparer: values.preparator,
            numApprover: values.approver
          })
        }
        setIsSuccesfull(true)
      }
    } catch (error) {
      console.log(error)
      onClose()
    }
  }

  return (
    <ModalFormStyle
      dataModalForm={!isSuccesfull ? {
        firstTitle: 'Condiciones',
        secondTitle: 'Especiales',
        description: 'Diligenciar todos los campos, para añadir un nuevo registro'
      }
        : {
          description: 'Se guardo la información exitosamente',
          secondTitle: 'Condiciones Especiales',
        }}
      onClose={onClose}
      showModal={showModal}
    >
      {!isSuccesfull ? (
        <form onSubmit={handleSubmit(onSuccess)}>
          <div className='flex justify-items-center'>
            <div className='flex flex-col sm:flex-row gap-12 w-full sm:max-w-lg my-3 justify-center items-center'>
              {types && types.map((type, index) => (
                <InputField
                  key={index}
                  type='radio'
                  label={type.letterType}
                  value={type.id}
                  name='letterTypeGroup'
                  onMouseOver={async () => {
                    const response = await getCondition({ letterType: type.letterType });
                    setPreparerApprove(response);
                    setVisibility(true);
                  }}
                  onMouseOut={() => {
                    setVisibility(false);
                  }}
                  onClick={() => {
                    setType(type.id);
                  }}
                />
              ))}
              {visibility && (
                <dialog open style={{ position: 'absolute', top: '275px', right: '-350px' }}>
                  <div style={{ border: '1px solid dilver', borderRadius: '3px', boxShadow: '3px 3px 3px 3px SILVER', fontSize: '10px', fontFamily: 'Arial' }}>
                    {preparerApprove?.map((preparerApprove, index) => (
                      <div key={index}>
                        ✔ {preparerApprove.name}
                      </div>
                    ))}
                  </div>
                </dialog>
              )}
            </div>
          </div>
          <div className='flex justify-items-center'>
            <div className='flex flex-col sm:flex-row gap-12 w-full sm:max-w-lg my-3 justify-center items-center' style={{ justifyContent: 'space-around' }}>
              <div className='relative grid justify-items-center'>
                <div className='flex gap-2 my-1'>
                  <img src={urlProtectorograph} style={{ width: '60%' }} />
                  <label>
                    <div>
                      <Paperclip aria-label='Adjuntar archivo' className='text-primary' size={20} />
                      <input
                        accept='application/pdf, image/png, image/jpeg'
                        className='hidden'
                        multiple
                        type='file'
                        onChange={async (e) => {
                          if (e.target.files) {
                            const files = [...e.target.files]
                            const filesInFormat = files.filter((file) =>
                              file.type.match(/^image\/(jpeg|jpg|png|gif)$/i)
                            )

                            const filesInSizeRange = filesInFormat.filter((file) => {
                              const sizeInMB = file.size / (1024 * 1024)
                              const isAtTheLimit = sizeInMB <= 100
                              return isAtTheLimit
                            })

                            if (filesInSizeRange.length > 0) {
                              await newProtectorograph(files)
                              setUrlProtectorograph(URL.createObjectURL(filesInSizeRange[0]))
                            }
                            e.target.value = ''
                          }
                        }}
                      />
                    </div>
                  </label>
                </div>
                <label>Protectografo</label>
              </div>
              <div className='relative grid justify-items-center'>
                <div className='flex gap-2 my-1'>
                  <img src={urlWetSeal} style={{ width: '60%' }} />
                  <label>
                    <div>
                      <Paperclip aria-label='Adjuntar archivo' className='text-primary' size={20} />
                      <input
                        accept='application/pdf, image/png, image/jpeg'
                        className='hidden'
                        multiple
                        type='file'
                        onChange={async (e) => {
                          if (e.target.files) {
                            const files = [...e.target.files]
                            const filesInFormat = files.filter((file) =>
                              file.type.match(/^image\/(jpeg|jpg|png|gif)$/i)
                            )

                            const filesInSizeRange = filesInFormat.filter((file) => {
                              const sizeInMB = file.size / (1024 * 1024)
                              const isAtTheLimit = sizeInMB <= 100
                              return isAtTheLimit
                            })

                            if (filesInSizeRange.length > 0) {
                              await newWetSeal(files)
                              setUrlWetSeal(URL.createObjectURL(filesInSizeRange[0]))
                            }
                            e.target.value = ''
                          }
                        }}
                      />
                    </div>
                  </label>
                </div>
                <label>Sello Humedo</label>
              </div>
            </div>
          </div>
          <div className='flex flex-col sm:flex-row gap-4 w-full sm:max-w-lg'>
            <div className='relative w-full sm:w-1/2'>
              <InputField
                {...register('managerRelationship')}
                error={errors.managerRelationship?.message}
                className='bg-transparent text-lg'
                placeholder='Gerente de relación'
                type='text'
                value={managerRelationship}
                onChange={(event) => {
                  if (event.target.value.length >= 0 && event.target.value.length <= 20) {
                    const array = event.target.value.split(' ')
                    if (array.length == 1) {
                      setManagerRelationship(event.target.value.replace(/\b\w/g, (match) => match.toUpperCase()));
                    } else {
                      setManagerRelationship(event.target.value);
                    }
                  }
                  if (event.target.value.length <= value) {
                    setValue(event.target.value.length)
                    setManagerRelationship(event.target.value)
                  }
                }}
              />
              <span className='absolute text-lg top-2 left-3 icon-file-lines text-primaryText-50' />
            </div>
            <div className='flex gap-2 sm:gap-4'>
              <div className='relative w-full'>
                <InputField
                  {...register('relationshipAssistant')}
                  error={errors.relationshipAssistant?.message}
                  className='bg-transparent text-lg'
                  placeholder='Asistente de relación'
                  type='text'
                  value={relationshipAssistant}
                  onChange={(event) => {
                    if (event.target.value.length >= 0 && event.target.value.length <= 20) {
                      const array = event.target.value.split(' ')
                      if (array.length == 1) {
                        setRelationshipAssistant(event.target.value.replace(/\b\w/g, (match) => match.toUpperCase()));
                      } else {
                        setRelationshipAssistant(event.target.value);
                      }
                    }
                    if (event.target.value.length <= value) {
                      setValue(event.target.value.length)
                      setRelationshipAssistant(event.target.value)
                    }
                  }}
                />
                <span className='absolute text-lg top-2 left-3 icon-file-lines text-primaryText-50' />
              </div>
            </div>
          </div>
          <div className='flex gap-2 sm:gap-4'>
            <div className='relative w-full my-2'>
              <InputField
                {...register('officeAddress')}
                error={errors.officeAddress?.message}
                className='bg-transparent text-lg w-full'
                placeholder='Direccion Oficina'
                type='text'
                value={officeAddress}
                onChange={(event) => {
                  if (event.target.value.length >= 0 && event.target.value.length <= 20) {
                    const array = event.target.value.split(' ')
                    if (array.length == 1) {
                      setOfficeAddress(event.target.value.replace(/\b\w/g, (match) => match.toUpperCase()));
                    } else {
                      setOfficeAddress(event.target.value);
                    }
                  }
                  if (event.target.value.length <= value) {
                    setValue(event.target.value.length)
                    setOfficeAddress(event.target.value)
                  }
                }}
              />
              <span className='absolute text-lg top-2 left-3 icon-file-lines text-primaryText-50' />
            </div>
          </div>
          <div className='text-center text-red p-4'>Flujo de aprobación</div>
          <div className='flex flex-col sm:flex-row gap-4 w-full sm:max-w-lg'>
            <div className='relative w-full'>
              <SelectField
                {...register('preparator')}
                className='bg-transparent text-lg text-primaryText-50'
                error={errors.preparator?.message}
                options={[{ label: "--Preparador--", value: "" }, ...options.map((ap) => ({ label: ap.label, value: ap.id }))]}
              />
              <span className='absolute text-lg top-2 left-3 icon-file-lines text-primaryText-50' />
            </div>
            <div className='relative w-full'>
              <SelectField
                {...register('approver')}
                className='bg-transparent text-lg text-primaryText-50'
                error={errors.approver?.message}
                options={[{ label: "--Aprobador--", value: "" }, ...options.map((ap) => ({ label: ap.label, value: ap.id }))]}
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
              <span className='z-10'>Guardar</span>
            </Button>
          </div>
        </form>
      )
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
    </ModalFormStyle >
  )
}