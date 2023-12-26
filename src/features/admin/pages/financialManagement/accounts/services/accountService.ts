import { ListOfApiOptionSchema } from '@/features/admin/schemas/account/ApiOptionSchema'
import { treasuryApi } from '@/features/common/api/treasuryApi'
import type { ApiOption } from '@/features/common/utils/mappers'

import { getCompanies } from '../../companies/services/companyService'
import { getInterfaces } from '../../interfaces/services/interfaceService'
import { getBanks } from '../../sources/banks/services/bankService'

export interface Datum {
  id?: number
  companyId?: number
  companyName?: string
  bankId?: number
  bankName?: string
  accountNumber?: string
  accountTypeId?: number
  accountTypeName?: string
  description?: string
  interfaceId?: number
  interfaceName?: string
  specialCondition?: string
  isActive?: boolean
}

export interface GetAccounts {
  count: number
  pageIndex: number
  pageSize: number
  data: Datum[]
  pageCount: number
}

export interface Params {
  BankId?: number | null
  CompanyId?: number | null
  IsActive?: boolean
  Id?: number
  PageIndex?: number
  PageSize?: number
  Search?: string
}

export const getAccounts = async (params: Params): Promise<GetAccounts> => {
  return await treasuryApi.get('/accounts', { params })
}

export interface ResponseGetExcelAccounts {
  value: string
  status: string
}

export const getExcelAccounts = async (): Promise<ResponseGetExcelAccounts> => {
  return await treasuryApi.get('/accounts/download/excel')
}

export interface CreateAccounts {
  companyId: number
  bankId: number
  accountNumber: string
  accountTypeId: number
  description: string
  interfaceId: number
  specialCondition: string
}

export interface ResponseCreateAccounts {
  value: string
  status: string
}

export const createAccounts = async (data: CreateAccounts): Promise<ResponseCreateAccounts> => {
  return await treasuryApi.post('/accounts', data)
}

export interface ResponseUpdateAccounts {
  value: string
  status: string
}

export const updateAccounts = async (id: number, data: Datum): Promise<ResponseUpdateAccounts> => {
  return await treasuryApi.put(`/accounts/${id}`, data)
}

export const getAccountTypes = async (): Promise<ApiOption[]> => {
  return ListOfApiOptionSchema.parse(await treasuryApi.get('/masters/accountTypes'))
}

export const getDescriptionFields = async (): Promise<ApiOption[]> => {
  return ListOfApiOptionSchema.parse(await treasuryApi.get('/masters/accountTypes'))
}

export const getBanksName = async (): Promise<ApiOption[]> => {
  const banks = await getBanks({})
  return ListOfApiOptionSchema.parse(
    banks.data.map((bank) => ({
      name: bank.name,
      id: bank.id
    }))
  )
}

export const getCompaniesName = async (): Promise<ApiOption[]> => {
  const companies = await getCompanies({})
  return ListOfApiOptionSchema.parse(
    companies.data.map((company) => ({
      name: company.shortName,
      id: company.id
    }))
  )
}

export const getInterfacesName = async (): Promise<ApiOption[]> => {
  const interfaces = await getInterfaces({})
  return ListOfApiOptionSchema.parse(
    interfaces.data.map((Interface) => ({
      name: Interface.description,
      id: Interface.id
    }))
  )
}

export const getAccountsOptions = async (): Promise<ApiOption[]> => {
  const interfaces = await getAccounts({})
  return ListOfApiOptionSchema.parse(
    interfaces.data.map((account) => ({
      name: account.accountNumber,
      id: account.id
    }))
  )
}
