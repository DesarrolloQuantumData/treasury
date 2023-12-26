import { useEffect, useReducer } from 'react'

import type { Option } from '@/features/common/components/ui/Form/SelectField'
import type { ApiOption } from '@/features/common/utils/mappers'
import { mapApiOptionToFormOption } from '@/features/common/utils/mappers'

import { get_Banks } from '../../../sources/banks/services/bankService'
import { get_TypeOfFile, get_TypeSeparator } from '../../services/interfaceService'

export interface AccountsSelects {
    typeOfFile: Option[]
    typeSeparator: Option[]
    bankName: Option[]
}

const initialSelects: AccountsSelects = {
    typeOfFile: [],
    typeSeparator: [],
    bankName: [],
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
        Promise.all([get_TypeOfFile(), get_TypeSeparator(), get_Banks()])
            .then(([typeOfFile, typeSeparator, banks]) => {
                setSelectOptionsFromApi('typeOfFile', typeOfFile)
                setSelectOptionsFromApi('typeSeparator', typeSeparator)
                setSelectOptionsFromApi('bankName', banks)
            })
            .catch(() => {
                console.log('Ocurrió un error obteniendo las listas para crear')
            })
    }, [])

    return { ...selects, setSelectOptions }
}
