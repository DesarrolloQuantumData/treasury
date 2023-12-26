import { useEffect, useReducer } from 'react'

import type { Option } from '@/features/common/components/ui/Form/SelectField'
import type { ApiOption } from '@/features/common/utils/mappers'
import { mapApiOptionToFormOption } from '@/features/common/utils/mappers'

import {
  getAccountTypes,
  getBanksName,
  getCompaniesName,
  getInterfacesName,
} from '../../services/accountService'

import {getAccountsOptions} from '../../../accounts/services/accountService'

export interface AccountsSelects {
  companyName: Option[]
  bankName: Option[]
  accountType: Option[]
  interfaceName: Option[]
  accounts: Option[]
}

const initialSelects: AccountsSelects = {
  companyName: [],
  bankName: [],
  accountType: [],
  interfaceName: [],
  accounts: []
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
    Promise.all([getBanksName(), getCompaniesName(), getAccountTypes(), getInterfacesName(), getAccountsOptions()])
      .then(([bankName, companyName, accountType, interfaceName, accounts]) => {
        setSelectOptionsFromApi('bankName', bankName)
        setSelectOptionsFromApi('companyName', companyName)
        setSelectOptionsFromApi('accountType', accountType)
        setSelectOptionsFromApi('interfaceName', interfaceName)
        setSelectOptionsFromApi('accounts', accounts)
      })
      .catch(() => {
        console.log('Ocurrió un error obteniendo las listas para crear')
      })
  }, [])

  return { ...selects, setSelectOptions }
}
