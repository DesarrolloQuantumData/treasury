import { treasuryApi } from '@/features/common/api/treasuryApi'

export interface Datum {
  id?: number
  code?: string
  name?: string
  nit?: string
  withholdings?: number
  ica?: number
  isActive?: boolean
}

export interface GetThirdParties {
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

export const getThirdParties = async (params: Params): Promise<GetThirdParties> => {
  return await treasuryApi.get('/thirdparties', { params })
}

export interface ResponseGetExcelThirdParties {
  value: string
  status: string
}

export const getExcelThirdParties = async (): Promise<ResponseGetExcelThirdParties> => {
  return await treasuryApi.get('/thirdparties/download/excel')
}

export interface CreateThirdParties {
  code?: string
  name?: string
  nit?: string
  withholdings?: string
  ica?: string
}

export interface ResponseCreateThirdParties {
  value: string
  status: string
}

export const createThirdParties = async (
  data: CreateThirdParties
): Promise<ResponseCreateThirdParties> => {
  return await treasuryApi.post('/thirdparties', data)
}

export interface ResponseUpdateThirdParties {
  value: string
  status: string
}

export const updateThirdParties = async (
  id?: number,
  data?: Datum
): Promise<ResponseUpdateThirdParties> => {
  return await treasuryApi.put(`/thirdparties/${id}`, data)
}
