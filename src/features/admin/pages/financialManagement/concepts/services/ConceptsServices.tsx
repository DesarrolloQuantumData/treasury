import { treasuryApi } from '@/features/common/api/treasuryApi'

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
  cashFlowConceptId?: number
  cashFlowConceptName?: string
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

export interface CreateConcepts {
  name?: string
  natureTypeId?: number
  cashFlowConceptId?: number
}

export interface ResponseGetExcelCashFlowConcepts {
  value: string
  status: string
}

export const getConcepts = async (params: Params): Promise<GetCashFlowConcepts> => {
  return await treasuryApi.get('/internalconcepts', { params })
}

export const createConcepts = async (data: CreateConcepts): Promise<void> => {
  return await treasuryApi.post('/internalconcepts', data)
}

export const updateConcepts = async (id: number, data: any): Promise<GetCashFlowConcepts> => {
  return await treasuryApi.put(`/internalconcepts/${id}`, data)
}

export const getCashFlowConcepts = async (params: Params): Promise<GetCashFlowConcepts> => {
  return await treasuryApi.get('/cashflowconcepts', { params })
}

export const getExcelConcepts = async (): Promise<ResponseGetExcelCashFlowConcepts> => {
  return await treasuryApi.get('/cashflowconcepts/download/excel')
}