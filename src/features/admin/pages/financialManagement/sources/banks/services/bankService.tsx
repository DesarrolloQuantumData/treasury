import { treasuryApi } from '@/features/common/api/treasuryApi'
import type { ApiOption } from '@/features/common/utils/mappers'
import { ListOfApiOptionSchema } from '@/features/admin/schemas/account/ApiOptionSchema'
import { boolean, number } from 'zod'

export interface Datum {
  id?: number
  code?: string
  name?: string
  nit?: string
  nameConventionFile?: string
  isActive?: boolean
}

export interface GetBanks {
  count: number
  pageIndex: number
  pageSize: number
  data: Datum[]
  pageCount: number
}

export interface Params {
  Id?: number
  PageIndex?: number
  PageSize?: number
  IsActive?: boolean
  Search?: string
}

export interface CreateBanks {
  code: string
  name: string
  nit: string
  nameConventionFile: string
}
export interface SpecialConditionsType {
  id?: number
  letterType?: string
  name?: string
  isActive?: boolean
}

export interface ResponseCreateBanks {
  value: string
  status: string
}

export interface ResponseUpdateBanks {
  value: string
  status: string
}

export interface ResponseGetExcelBanks {
  value: string
  status: string
}

export interface ResponseTypes {
  id: number,
  isActive: boolean
  letterType: string
  name: string
}

export interface ResponseConditions {
  id: number
  letterType: number
  name: number
  isActive: boolean
}

export interface ResponseSpecialCondition {
  id: number
  specialConditionTypeId: number
  protectograph: string
  wetSeal: string
  relationshipManager: string
  relationshipAssistant: string
  officeAddress: string
  numPreparer: number
  numApprover: number
  bankId: number
  bankName: string
  isActive: boolean
}

export interface newSpecialConditionParams {
  specialConditionTypeId?: number
  protectograph?: string
  wetSeal?: string
  relationshipManager?: string
  relationshipAssistant?: string
  officeAddress?: string
  numPreparer?: number
  numApprover?: number
  bankId?: number
}

export interface uptSpecialConditionParams {
  id?: number
  specialConditionTypeId?: number
  protectograph?: string
  wetSeal?:string
  relationshipManager?: string
  relationshipAssistant?: string
  officeAddress?: string
  numPreparer?: number
  numApprover?: number
  isActive?: boolean
}

export interface ParamsConditions {
  SpecialConditionTypeId?: number
  BankId?: number
  IsActive?: boolean
  Id?: number
}

export const getBanks = async (params: Params): Promise<GetBanks> => {
  return await treasuryApi.get('/banks', { params })
}

export const getExcelBanks = async (): Promise<ResponseGetExcelBanks> => {
  return await treasuryApi.get('/banks/download/excel')
}

export const getResponseSpecialCondition = async (params: ParamsConditions): Promise<ResponseSpecialCondition[]> => {
  return await treasuryApi.get('/conditions', { params })
}

export const getTypes = async (): Promise<ResponseTypes[]> => {
  return await treasuryApi.get('/conditions/types')
}

export const getCondition = async (params: SpecialConditionsType): Promise<ResponseConditions[]> => {
  return await treasuryApi.get('/conditions/SpecialConditionsTypes', { params });
}

export const createBanks = async (params: CreateBanks): Promise<ResponseCreateBanks> => {
  return await treasuryApi.post('/banks', params)
}

export const updateBanks = async (id: number, params: Datum): Promise<ResponseUpdateBanks> => {
  return await treasuryApi.put(`/banks/${id}`, params)
}

export const NewConditionSpecial = async (params: newSpecialConditionParams): Promise<void> => {
  return await treasuryApi.post('/conditions', params)
}

export const uptConditionSpecial = async (id: number, params: uptSpecialConditionParams): Promise<void> => {
  console.log(params)
  return await treasuryApi.put(`/conditions/${id}`, params)
}

export const newProtectorograph = async (image: File[]): Promise<void> => {
  return await treasuryApi.postForm('/conditions/protectograph/uploap/img', image)
}

export const newWetSeal = async (image: File[]): Promise<void> => {
  return await treasuryApi.postForm('/conditions/wetseal/upload/img', image)
}


export const get_Banks = async (): Promise<ApiOption[]> => {
  const companies = await getBanks({ PageSize: 99999 })
  return ListOfApiOptionSchema.parse(
    companies.data.map((company) => ({
      name: company.name,
      id: company.id
    }))
  )
  return []
}