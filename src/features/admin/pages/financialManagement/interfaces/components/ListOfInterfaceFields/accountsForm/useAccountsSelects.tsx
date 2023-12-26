import { useEffect, useReducer } from 'react'

import type { Option } from '@/features/common/components/ui/Form/SelectField'
import type { ApiOption } from '@/features/common/utils/mappers'
import { mapApiOptionToFormOption } from '@/features/common/utils/mappers'

import {
    getTypeOfFile,
    getDescriptionFields,
    getNatureTypes,
    getFieldAlignments,
    getDateFormats
} from '../services/ListOfInterfaceFieldsSevice'

export interface AccountsSelects {
    TypeOfFile: Option[]
    DescriptionFields: Option[]
    NatureTypes: Option[]
    FieldAlignments: Option[]
    DateFormat: Option[]
}

const initialSelects: AccountsSelects = {
    TypeOfFile: [],
    DescriptionFields: [],
    NatureTypes: [],
    FieldAlignments: [],
    DateFormat: []
}
type AccountsSelectActionKind = keyof AccountsSelects
type AccountsSelectAction = {
    type: AccountsSelectActionKind
    payload: Option[]
}

const selectsReducer = (state: AccountsSelects, action: AccountsSelectAction): AccountsSelects => {
    return {
        ...state,
        [action.type]: action.payload
    }
}

export interface UseAccountsSelectsReturn extends AccountsSelects {
    setSelectOptions: (selectKey: AccountsSelectActionKind, options: Option[]) => void
}
export const useAccountsSelects = (): UseAccountsSelectsReturn => {
    const [selects, selectsDispatch] = useReducer(selectsReducer, initialSelects)

    const setSelectOptionsFromApi = (selectKey: AccountsSelectActionKind, data: ApiOption[]): void =>
        selectsDispatch({
            payload: data.map(mapApiOptionToFormOption),
            type: selectKey
        })

    const setSelectOptions = (selectKey: AccountsSelectActionKind, options: Option[]): void =>
        selectsDispatch({
            payload: options,
            type: selectKey
        })

    useEffect(() => {
        Promise.all([getTypeOfFile(), getDescriptionFields(), getNatureTypes(), getFieldAlignments(), getDateFormats()])
            .then(([typeOfFile, descriptionFields, natureTypes, fieldAlignments, dateFormats]) => {
                setSelectOptionsFromApi('TypeOfFile', typeOfFile)
                setSelectOptionsFromApi('DescriptionFields', descriptionFields)
                setSelectOptionsFromApi('NatureTypes', natureTypes)
                setSelectOptionsFromApi('FieldAlignments', fieldAlignments)
                setSelectOptionsFromApi('DateFormat', dateFormats)
            })
            .catch(() => {
                console.log('Ocurrió un error obteniendo las listas para crear')
            })
    }, [])

    return { ...selects, setSelectOptions }
}