import { treasuryApi } from '@/features/common/api/treasuryApi'

export interface SubModuls {
  id: number
  name: string
  urlImg: string
  path: string
  order: number
  access: null
  childModules: SubModuls[]
}

export interface GetModuls {
  id: number
  name: string
  urlImg: string
  path: string
  order: number
  access: null
  childModules: SubModuls[]
}

const orderData = (a: GetModuls, b: GetModuls) => {
  return a.order - b.order
}
export const getModuleService = async (roleId: string): Promise<GetModuls[]> => {
  const data: GetModuls[] = await treasuryApi.get(`/auth/modules/${roleId}`)
  const sortData = data.sort(orderData)
  sortData.forEach((item) => {
    if (item.childModules.length > 0) {
      item.childModules.sort(orderData)
    }
  })
  return sortData
}
