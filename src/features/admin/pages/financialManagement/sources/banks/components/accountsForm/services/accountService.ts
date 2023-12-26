import { treasuryApi } from '@/features/common/api/treasuryApi'
import type { ApiOption } from '@/features/common/utils/mappers'
import { ListOfApiOptionSchema } from '@/features/admin/schemas/account/ApiOptionSchema'

import {getBanks,getConceptsInternals} from '../../conceptsBank/services/ConceptsBanksServices'
import { NatureTypeName } from '@/features/admin/pages/financialManagement/cashFlowConcepts/services/cashFlowConceptsServices'

export const getAccountTypes = async (): Promise<ApiOption[]> => {
    return ListOfApiOptionSchema.parse(await treasuryApi.get('/masters/accountTypes'))
  }
  
  export const getDescriptionFields = async (): Promise<ApiOption[]> => {
    return ListOfApiOptionSchema.parse(await treasuryApi.get('/masters/accountTypes'))
  }
  
  export const getBanksName = async (Id?: number): Promise<ApiOption[]> => {
    const banks = await getBanks({id:Id})
    return ListOfApiOptionSchema.parse(
      banks.data.map((bank) => ({
        name: bank.name,
        id: bank.id
      }))
    )
  }

  export const getInternalConcept = async (): Promise<ApiOption[]> => {
    const banks = await getConceptsInternals({})
    return ListOfApiOptionSchema.parse(
      banks.data.map((bank) => ({
        name: bank.name,
        id: bank.id,
        NatureTypeName:bank.natureTypeName
      }))
    )
  }
  