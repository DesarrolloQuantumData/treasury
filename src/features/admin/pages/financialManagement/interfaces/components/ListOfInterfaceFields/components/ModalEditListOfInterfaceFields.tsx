import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

import { Button } from '@/features/common/components/ui/Button'
import { InputField } from '@/features/common/components/ui/Form'
import { SelectField } from '@/features/common/components/ui/Form/SelectField'
import { ModalFormStyle } from '@/features/common/components/ui/Modal/modalStyle/ModalFormStyle'
import { updaListOfInterfaceFields, Datum } from '../services/ListOfInterfaceFieldsSevice'
import { getDefaultSelectOption } from '@/features/common/utils/defaults'
import { useAccountsSelects } from '../accountsForm/useAccountsSelects'
import { lnterfacesListInterfaceFields, modalnterfacesListInterfaceFields } from '../../../../../../schemas/interfaces/interfacesListInterfaceFieldsShema'

interface ModalinterfacesProps {
    showModal: boolean
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
    selectedListOfInterfaceFields: Datum
    isActive: boolean
    getTableListOfInterfaceFields: any

}

export const ModalEditListOfInterfaceFields: React.FC<ModalinterfacesProps> = ({
    showModal,
    setShowModal,
    selectedListOfInterfaceFields,
    isActive,
    getTableListOfInterfaceFields
}) => {
    const { formState, reset, handleSubmit, register } = useForm<lnterfacesListInterfaceFields>({
        resolver: zodResolver(modalnterfacesListInterfaceFields)
    })

    const [initialPosition, setInitialPosition] = useState(selectedListOfInterfaceFields.initialPosition)
    const [length, setLength] = useState(selectedListOfInterfaceFields.length)
    const [value, setValue] = useState(0)

    const defaultOptions = {
        typeOfFile: getDefaultSelectOption({ valueAsNumber: true }, 'Tipo Campo'),
        Description: getDefaultSelectOption({ valueAsNumber: true }, 'Descripcion/Nombre'),
        Nature: getDefaultSelectOption({ valueAsNumber: true }, 'Naturaleza'),
        Alignments: getDefaultSelectOption({ valueAsNumber: true }, 'Alineacion'),
        Decimal: getDefaultSelectOption({ valueAsNumber: true }, 'Decimales'),
        FormatDate: getDefaultSelectOption({ valueAsNumber: true }, 'Formato Fecha'),
    }

    const selects = useAccountsSelects()
    const { TypeOfFile, DescriptionFields, NatureTypes, FieldAlignments, DateFormat } = selects
    const [isSuccesfull, setIsSuccesfull] = useState(false)
    const [Decimals, setDecimal] = useState(false)
    const { errors } = formState

    const onClose = () => {
        setShowModal(false)
        getTableListOfInterfaceFields()
        reset()
    }

    const onSuccess = async (values: lnterfacesListInterfaceFields) => {
        try {
            values.HasDecimals = Decimals
            await updaListOfInterfaceFields(selectedListOfInterfaceFields.id, { ...values, isActive })
            onClose()
        } catch (error) {
            console.log(error)
            onClose()
        }
    }

    return (
        <ModalFormStyle
            dataModalForm={{
                firstTitle: 'Campo',
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
                            {...register('InterfaceId')}
                            className='bg-transparent text-lg w-full'
                            defaultValue={selectedListOfInterfaceFields.interfaceId}
                            disabled
                            placeholder='0000000'
                        />
                        <span className='absolute text-lg top-2 left-3 icon-key text-primaryText-50' />
                    </div>
                </div>
                <div className='flex flex-col sm:flex-row gap-4 w-full sm:max-w-lg my-1'>
                    <div className='relative w-full sm:w-1/2'>
                        <SelectField
                            {...register('FieldTypeId')}
                            className='bg-transparent text-lg text-primaryText-50'
                            error={errors.FieldTypeId?.message?.toString()}
                            options={[defaultOptions.typeOfFile, ...TypeOfFile]}
                        />
                        <span className='absolute text-lg top-2 left-3 icon-file-pen text-primaryText-50' />
                    </div>
                    <div className='relative w-full sm:w-1/2'>
                        <div className='relative w-full'>
                            <SelectField
                                {...register('DescriptionFieldId')}
                                className='bg-transparent text-lg text-primaryText-50'
                                error={errors.DescriptionFieldId?.message?.toString()}
                                options={[defaultOptions.Description, ...DescriptionFields]}
                            />
                            <span className='absolute text-lg top-2 left-3 icon-file-pen text-primaryText-50' />
                        </div>
                    </div>
                </div>
                <div className='flex flex-col sm:flex-row gap-4 w-full sm:max-w-lg my-1'>
                    <div className='relative w-full sm:w-1/2'>
                        <SelectField
                            {...register('NatureTypeId')}
                            className='bg-transparent text-lg text-primaryText-50'
                            error={errors.NatureTypeId?.message?.toString()}
                            options={[defaultOptions.Nature, ...NatureTypes]}
                        />
                        <span className='absolute text-lg top-2 left-3 icon-file-pen text-primaryText-50' />
                    </div>
                    <div className='relative w-full sm:w-1/2'>
                        <div className='relative w-full'>
                            <InputField
                                className='bg-transparent text-lg'
                                error={errors.InitialPosition?.message?.toString()}
                                {...register('Length')}
                                placeholder='Cant. Líneas encabezado'
                                type='text'
                                value={initialPosition}
                                onChange={(event) => {
                                    const soloNumeros = /^[0-9]+$/.test(event.target.value);
                                    if (event.cancelable || soloNumeros && event.target.value.length >= 0 && event.target.value.length <= 2) {
                                        setInitialPosition(event.target.value);
                                    }
                                    if (event.target.value.length <= value) {
                                        setValue(event.target.value.length)
                                        setInitialPosition(event.target.value)
                                    }
                                }}
                            />
                            <span className='absolute text-lg top-2 left-3 icon-file-pen text-primaryText-50' />
                        </div>
                    </div>
                </div>
                <div className='flex flex-col sm:flex-row gap-4 w-full sm:max-w-lg my-1'>
                    <div className='relative w-full sm:w-1/2'>
                        <InputField
                            className='bg-transparent text-lg'
                            error={errors.Length?.message?.toString()}
                            {...register('InitialPosition')}
                            placeholder='Cant. Líneas finales'
                            type='text'
                            value={length}
                            onChange={(event) => {
                                const soloNumeros = /^[0-9]+$/.test(event.target.value);
                                if (event.cancelable || soloNumeros && event.target.value.length >= 0 && event.target.value.length <= 2) {
                                    setLength(parseInt(event.target.value))
                                }
                                if (event.target.value.length <= value) {
                                    setValue(event.target.value.length)
                                    setLength(parseInt(event.target.value))
                                }
                            }}
                        />
                        <span className='absolute text-lg top-2 left-3 icon-file-pen text-primaryText-50' />
                    </div>
                    <div className='relative w-full sm:w-1/2'>
                        <div className='relative w-full'>
                            <SelectField
                                {...register('FieldAlignmentId')}
                                className='bg-transparent text-lg text-primaryText-50'
                                error={errors.FieldAlignmentId?.message?.toString()}
                                options={[defaultOptions.Alignments, ...FieldAlignments]}
                            />
                            <span className='absolute text-lg top-2 left-3 icon-file-pen text-primaryText-50' />
                        </div>
                    </div>
                </div>
                <div className='flex flex-col sm:flex-row gap-4 w-full sm:max-w-lg'>
                    <div className='relative w-full sm:w-1/2'>
                        <SelectField
                            {...register('HasDecimals')}
                            className='bg-transparent text-lg text-primaryText-50'
                            error={errors.HasDecimals?.message?.toString()}
                            options={[defaultOptions.Decimal, { value: "1", label: "Si" }, { value: "2", label: "NO" }]}
                            onChange={(selectedOption) => {
                                setDecimal(selectedOption.target.value == "1" ? true : false)
                            }}
                        />
                        <span className='absolute text-lg top-2 left-3 icon-file-pen text-primaryText-50' />
                    </div>
                    <div className='relative w-full sm:w-1/2'>
                        <div className='relative w-full'>
                            <SelectField
                                {...register('DateFormatId')}
                                className='bg-transparent text-lg text-primaryText-50'
                                error={errors.DateFormatId?.message?.toString()}
                                options={[defaultOptions.FormatDate, ...DateFormat]}
                            />
                            <span className='absolute text-lg top-2 left-3 icon-file-pen text-primaryText-50' />
                        </div>
                    </div>
                </div>
                <div className='flex sm:justify-end'>
                    <Button
                        className='bg-secondary w-full sm:w-52 h-12 mt-3 button'
                        rounded='2xl'
                        type='submit'
                    >
                        <span className='z-10 icon-check left-4' />
                        <span className='z-10'>Guardar</span>
                    </Button>
                </div>
            </form>
        </ModalFormStyle >
    )
}