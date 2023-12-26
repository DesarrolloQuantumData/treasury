import { treasuryApi } from '@/features/common/api/treasuryApi'
import type { ApiOption } from '@/features/common/utils/mappers'
import { ListOfApiOptionSchema } from '@/features/admin/schemas/account/ApiOptionSchema'
import { boolean, number, string } from 'zod'

export interface Datum {
    id: number
    interfaceId: number
    fieldTypeId: number
    fieldTypeName: string
    descriptionFieldId: number
    descriptionFieldName: string
    natureTypeId: number
    natureTypeName: string
    initialPosition: string
    length: number
    fieldAlignmentId: number
    fieldAlignmentName: string
    hasDecimals: number
    dateFormatId: number
    dateFormatName: Date
    isActive: boolean
    actions: any
}

export interface GetInterfaceFieldsParams {
    count: number
    pageIndex: number
    pageSize: number
    data: Datum[]
    pageCount: number
}

export interface Params {
    interfaceId?: any
    IsActive?: boolean
    PageIndex?: number
    PageSize?: number
    Search?: string
}

export interface ResponseGetExcelCashFlowConcepts {
    value: string
    status: string
}

export interface ResponseUpdateAccounts {
    value: string
    status: string
}

export interface InterfacesFormValues {
        InterfaceId?: number;
        FieldTypeId?: number;
        DescriptionFieldId?: number;
        NatureTypeId?: number;
        InitialPosition?: number;
        Length?: number;
        FieldAlignmentId?: number;
        HasDecimals?: boolean;
        DateFormatId?: number;
}

export interface ResponseCreateInterfaces {
    value: string
    status: string
}

export const getListOfInterfaceFields = async (params: Params): Promise<GetInterfaceFieldsParams> => {
    return await treasuryApi.get('/interfaces/fields', { params })
}

export const createListOfInterfaceFields = async (data: InterfacesFormValues): Promise<ResponseCreateInterfaces> => {
    return await treasuryApi.post('/interfaces/fields', data)
}

export const updaListOfInterfaceFields = async (id: number, data: any): Promise<ResponseUpdateAccounts> => {
    console.log(data)
    return await treasuryApi.put(`/interfaces/fields/${id}`, data)
}

export const getExcelListOfInterfaceFields = async (): Promise<ResponseGetExcelCashFlowConcepts> => {
    return await treasuryApi.get('/interfaces/fields/download/excel')
}

export const getTypeOfFile = async (): Promise<ApiOption[]> => {
    return ListOfApiOptionSchema.parse(await treasuryApi.get('/masters/fieldTypes'))
}

export const getDescriptionFields = async (): Promise<ApiOption[]> => {
    return ListOfApiOptionSchema.parse(await treasuryApi.get('/masters/descriptionFields'))
}

export const getNatureTypes = async (): Promise<ApiOption[]> => {
    return ListOfApiOptionSchema.parse(await treasuryApi.get('/masters/natureTypes'))
}

export const getFieldAlignments = async (): Promise<ApiOption[]> => {
    return ListOfApiOptionSchema.parse(await treasuryApi.get('/masters/fieldAlignments'))
}

export const getDateFormats = async (): Promise<ApiOption[]> => {
    return ListOfApiOptionSchema.parse(await treasuryApi.get('/masters/dateFormats'))
}

