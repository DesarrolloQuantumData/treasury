import { treasuryApi } from '@/features/common/api/treasuryApi'
import type { ApiOption } from '@/features/common/utils/mappers'
import { ListOfApiOptionSchema } from '@/features/admin/schemas/account/ApiOptionSchema'

export enum NatureTypeName {
  Credito = 'CREDITO',
  Debito = 'DEBITO'
}
export interface Datum {
  id?: number
  isActive?: boolean
  name?: string
  natureTypeId?: number
  natureTypeName?: NatureTypeName
}

export interface GetCashFlowConcepts {
  count: number
  pageIndex: number
  pageSize: number
  data: Datum[]
  pageCount: number
}

interface Params {
  NatureTypeId?: number
  IsActive?: boolean
  Id?: number
  PageIndex?: number
  PageSize?: number
  Search?: string
}

export interface GetNatureTypes {
  id: number
  name: string
  isActive: boolean
}

export interface GetBudgetconcept {
  Data: Datum[]
}

export type GetNatureTypesList = GetNatureTypes[]

export interface ResponseGetExcelCashFlowConcepts {
  value: string
  status: string
}

export interface CreateCashFlowConcepts {
  name: string
  natureTypeId: number
}

export interface ResponseCashFlowConcepts {
  value: string
  status: string
}

export const createCashFlowConcepts = async (data: CreateCashFlowConcepts): Promise<ResponseCashFlowConcepts> => {
  return await treasuryApi.post('/cashflowconcepts', data)
}

export interface ResponseUpdateConcepts {
  value: string
  status: string
}

export const getCashFlowConcept = async (): Promise<ApiOption[]> => {
  const Concepts = await getCashFlowConcepts({PageSize:99999})
  return ListOfApiOptionSchema.parse(
    Concepts.data.map((Concept) => ({
      name: Concept.name,
      id: Concept.id
    }))
  )
}

export const getNature_Types = async (): Promise<ApiOption[]> => {
  const companies = await getNatureTypes()
  return ListOfApiOptionSchema.parse(
    companies.map((natureType) => ({
      name: natureType.name,
      id: natureType.id
    }))
  )
  return[]
}

export const getCashFlowConcepts = async (params: Params): Promise<GetCashFlowConcepts> => {
  return await treasuryApi.get('/cashflowconcepts', { params })
}

export const getExcelCashFlowConcepts = async (): Promise<ResponseGetExcelCashFlowConcepts> => {
  return await treasuryApi.get('/cashflowconcepts/download/excel')
}

export const getNatureTypes = async (): Promise<GetNatureTypesList> => {
  return await treasuryApi.get('/masters/natureTypes')
}

export const updateCashFlowConcepts = async (
  id: number,
  data: Datum
): Promise<ResponseUpdateConcepts> => {
  return await treasuryApi.put(`/cashflowconcepts/${id}`, data)
}