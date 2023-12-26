import React, { useState } from 'react'
import { ModalFormStyle } from '@/features/common/components/ui/Modal/modalStyle/ModalFormStyle'
import { Button } from '@/features/common/components/ui/Button'
import { InputField } from '@/features/common/components/ui/Form'
import { type BankFormValues, modalConceptsBanksFormSchema } from '@/features/admin/schemas/conceptsBanks/conceptsBanksSchema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SelectField } from '@/features/common/components/ui/Form/SelectField'
import { CreateConceptsBanks } from '../services/ConceptsBanksServices'
import { getDefaultSelectOption } from '@/features/common/utils/defaults'
import { useAccountsSelects } from '../../accountsForm/accountsSelect'
import { getConceptsInternals } from '../services/ConceptsBanksServices'

interface ModalCreateConceptsBanksProps {
    showModal: boolean
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
    selectedBank:any
}

export const ModalCreateConceptsBanksForm: React.FC<ModalCreateConceptsBanksProps> = ({ showModal, setShowModal, selectedBank}) => {
    const { formState, handleSubmit, reset, register } = useForm<BankFormValues>({
        resolver: zodResolver(modalConceptsBanksFormSchema)
    })

    const[ value,setValue]=useState(0)
    const[ Concept,setConcept]=useState("")
    const selects = useAccountsSelects(selectedBank.bankId)
    const [isSuccesfull, setIsSuccesfull] = useState(false)
    const { internalConcept } = selects
    const [natural, setNatural] = useState<string | undefined>(undefined)
    const [ConceptoSelected, setConceptoSelected] = useState(false)
    const [NaturalValue, setNaturalValue] = useState<number | undefined>(undefined)

    const defaultOptionsConcepstBancos = {
        accountType: getDefaultSelectOption({ valueAsNumber: true }, 'concepto interno'),
        bankName: getDefaultSelectOption({ valueAsNumber: true }, 'id')
    }

    const { errors } = formState
    const onClose = () => {
        setShowModal(false)
        setConceptoSelected(false)
        reset()
        setConcept("")
    }

    const onSuccess = async (values: BankFormValues): Promise<void> => {
        try {
            values.bankId = selectedBank.id
            values.natureTypeId = NaturalValue
            await CreateConceptsBanks(values)
            setIsSuccesfull(true)
        } catch (error) {
            console.log(error)
            onClose()
        }
    }

    return (
        <>
            <ModalFormStyle
                dataModalForm={!isSuccesfull ? {
                    firstTitle: 'Crear Nuevo',
                    secondTitle: 'Concepto para el banco',
                    description: 'Diligenciar todos los campos, para añadir un nuevo registro'
                } : {
                    description: 'El nuevo registro se ha creado exitosamente',
                    secondTitle: 'Concepto para el banco',
                    firstTitle: 'Crear'
                }}
                onClose={onClose}
                showModal={showModal}
            >
                {!isSuccesfull ? (
                    <form onSubmit={handleSubmit(onSuccess)}>
                        <div className='space-y-3'>
                            <div className='flex items-center gap-2'>
                                <div className='relative'>
                                    <InputField
                                        className='bg-transparent text-lg w-full pl-10'
                                        disabled
                                        placeholder='0000000'
                                        defaultValue={selectedBank.code}
                                    />
                                    <span className='absolute text-lg top-2 left-3 icon-key text-primaryText-50' />
                                </div>
                            </div>
                            <div className='relative'>
                                <InputField
                                    {...register('name')}
                                    className='bg-transparent text-lg pl-10'
                                    error={errors.name?.message}
                                    placeholder='Concepto bancario'
                                    type='text'
                                    value={Concept}
                                    onChange={(event) => {
                                        if (event.target.value.length >= 0 && event.target.value.length <= 30) {
                                          const array = event.target.value.split(' ')
                                          if (array.length == 1) {
                                            setConcept(event.target.value.replace(/\b\w/g, (match) => match.toUpperCase()));
                                          } else {
                                            setConcept(event.target.value);
                                          }
                                        }
                                        if (event.target.value.length <= value) {
                                            setValue(event.target.value.length)
                                          setConcept(event.target.value)
                                        }
                                      }}
                                />
                                <span className='absolute text-lg top-2 left-3 icon-file-pen text-primaryText-50' />
                            </div>
                            <div className='flex gap-2'>
                                <div className='relative'>
                                    <SelectField
                                        {...register('internalConceptId')}
                                        className='bg-transparent text-lg text-primaryText-50 '
                                        error={errors.internalConceptId?.message}
                                        options={[defaultOptionsConcepstBancos.accountType, ...internalConcept]}
                                        onClick={async (e) => {
                                            const value = parseInt(e.currentTarget.value);
                                            if (value !== -1) {
                                                const data = await getConceptsInternals({ id: value })
                                                setNatural(data.data[0].natureTypeName)
                                                setNaturalValue(data.data[0].natureTypeId)
                                                setConceptoSelected(true)
                                            } else {
                                                setConceptoSelected(false)
                                            }
                                        }}
                                    />
                                    <span className='absolute text-lg top-2 left-3 icon-file-lines text-primaryText-50' />
                                </div>
                                <div className='relative'>
                                    <InputField
                                        className='bg-transparent text-lg pl-10'
                                        error={errors.name?.message}
                                        defaultValue={selectedBank.name}
                                        type='text'
                                        disabled
                                    />
                                    <span className='absolute text-lg top-2 left-3 icon-file-lines text-primaryText-50' />
                                </div>
                            </div>
                            <div className='flex items-center gap-2'>

                                <div className='relative'>
                                    <h2 className='font-bold text-2xl sm:text-xl pb-5 sm:pb-0 text-primaryText-400 text-center sm:text-left mr-5'>Naturaleza: {ConceptoSelected ? natural : ""}
                                    </h2>
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
        </>
    )
}
