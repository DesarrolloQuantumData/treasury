import { treasuryApi } from '@/features/common/api/treasuryApi'

interface Params {
  IsActive?: boolean
  Id?: number
  PageIndex?: number
  PageSize?: number
  Search?: string
}
export interface Datum {
  isActive?: boolean
  id?: number
  shortName?: string
  fullName?: string
  nit?: string
  companyTypeId?: number
  companyType?: null
}
export interface GetCompany {
  count: number
  pageIndex: number
  pageSize: number
  data: Datum[]
  pageCount: number
}

export const getCompanies = async (params?: Params): Promise<GetCompany> => {
  return await treasuryApi.get('/companies', { params })
}

export interface ResponseGetExcelCompanies {
  value: string
  status: string
}

export const getExcelCompanies = async (): Promise<ResponseGetExcelCompanies> => {
  return await treasuryApi.get('/companies/download/excel')
}


interface Body {
  shortName: string
  fullName: string
  nit: string
  isActive?: boolean
}

export const newCompany = async (data: Body): Promise<void> => {
  return await treasuryApi.post('/companies', data)
}


export interface ResponseUpdateCompanies {
  value: string
  status: string
}

export const updateCompany = async (id: number, data: any): Promise<ResponseUpdateCompanies> => {
  return await treasuryApi.put(`/companies/${id}`, data)
}