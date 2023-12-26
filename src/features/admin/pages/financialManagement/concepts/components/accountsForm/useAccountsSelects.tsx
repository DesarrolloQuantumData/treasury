import { useEffect, useReducer } from 'react'

import type { Option } from '@/features/common/components/ui/Form/SelectField'
import type { ApiOption } from '@/features/common/utils/mappers'
import { mapApiOptionToFormOption } from '@/features/common/utils/mappers'

import {
    getCashFlowConcept,
    getNature_Types
} from '../../../cashFlowConcepts/services/cashFlowConceptsServices'

export interface AccountsSelects {
    cashFlowConcept: Option[]
    natureTypes: Option[]
}

const initialSelects: AccountsSelects = {
    cashFlowConcept: [],
    natureTypes: [],
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
        Promise.all([getNature_Types(), getCashFlowConcept()])
            .then(([natureTypes, cashFlowConcept]) => {
                setSelectOptionsFromApi('cashFlowConcept', cashFlowConcept)
                setSelectOptionsFromApi('natureTypes', natureTypes)
            })
            .catch(() => {
                console.log('Ocurrió un error obteniendo las listas para crear')
            })
    }, [])

    return { ...selects, setSelectOptions }
}
