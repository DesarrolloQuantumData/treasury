import { treasuryApi } from '@/features/common/api/treasuryApi'

export interface Datum {
    id: number
    date: string
    companyName: string
    bankName: string
    account: string
    userId: string
    fileName: string
    state: string
    actions: string
}

export interface getBanksBalances {
    count: number
    pageIndex: number
    pageSize: number
    data: Datum[]
    pageCount: number
}

interface Params {
    DateList?: Date | null
    CompanyId?: number | null
    BankId?: number | null
    Account?: number | null
    IsActive?: boolean
    Id?: number
    PageIndex?: number
    PageSize?: number
    Search?: string
}

interface CreateBankBalance {
    companyId: number
    bankId: number
    accountId: number
    userId: string
    description: string
    fileName?: string
    registeredType?: string
}

export interface ResponseGetExcel {
    value: string
    status: string
}
export interface Response {
    value: string
    status: string
}

export const getBankBalance = async (params: Params): Promise<getBanksBalances> => {
    return await treasuryApi.get('/BackFile', { params })
}

export const newUploapFiles = async (files: File[] | null): Promise<Response> => {
    const formData = new FormData()
    if (files != null) {
        files.forEach((file) => {
            formData.append('files', file)
        })
    }
    return await treasuryApi.postForm('/BackFile/uploap/file', formData)
}

export const newBankBalance = async (data: CreateBankBalance): Promise<Response> => {
    return await treasuryApi.post('/BackFile', data)
}

export const getExcelBankBalance = async (): Promise<ResponseGetExcel> => {
    return await treasuryApi.get('/BackFile/download/excel')
}

export interface ResponseUpdateAccounts {
    value: string
    status: string
}
