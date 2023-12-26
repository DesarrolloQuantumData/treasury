import { treasuryApi } from '@/features/common/api/treasuryApi'
import type { ApiOption } from '@/features/common/utils/mappers'
import { ListOfApiOptionSchema } from '@/features/admin/schemas/account/ApiOptionSchema'

interface Params {
  IsActive?: boolean
  id?: number
  PageIndex?: number
  PageSize?: number
  Search?: string
}
export interface Datum {
  isActive?: boolean,
  id?: number,
  bankId?: number,
  internalConceptId?: number,
  internalConceptName?: string,
  name?: string,
  natureTypeId?: number,
  natureTypeName?: string
  Actions?: number
  BankName?:string
}
export interface GetCompany {
  count: number
  pageIndex: number
  pageSize: number
  data: Datum[]
  pageCount: number
}


export interface Create_ConceptsBanks {
  name?: string,
  internalConceptId?: number,
  natureTypeId?: number,
  bankId?: number
}

export interface ResponseCreateBanks {
  value: string
  status: string
}

export interface ResponseUpdateConceptBank {
  value: string
  status: string
}

export interface ResponseGetExcelConceptBank {
  value: string
  status: string
}

export const getConcepts = async (params?: Params): Promise<GetCompany> => {   
  return await treasuryApi.get('/bankingconcepts', { params });
}

export const getConceptsInternals = async (params?: Params): Promise<GetCompany> => {
  return await treasuryApi.get('/internalconcepts', { params })
}

export const getBanks = async (params?: Params): Promise<GetCompany> => {
  return await treasuryApi.get('/banks', { params })
}

export const CreateConceptsBanks = async (data: Create_ConceptsBanks): Promise<void> => {
  return await treasuryApi.post('/bankingconcepts', data)
}

export const updateConceptBank = async (id: number, data: any): Promise<ResponseUpdateConceptBank> => {
  return await treasuryApi.put(`/bankingconcepts/${id}`, data)
}



export const exportConceptBank = async (): Promise<ResponseGetExcelConceptBank> => {
  return await treasuryApi.get('/bankingconcepts/download/excel')
}