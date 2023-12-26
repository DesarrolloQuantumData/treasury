import { useEffect, useState } from 'react'

import type { SubModuls } from '@/features/admin/services/moduleService'
import { getModuleService } from '@/features/admin/services/moduleService'
import { SERVER_BASE_URL } from '@/features/common/consts/app.js'

import { Card } from '../../../common/components/ui/Card.tsx/index.js'
import { SubSubmodule } from '../../../../features/common/components/navbar/BreadCrumbs';

interface Props {
  roleId: string
  pathModule: string
  pathSubModule: string
}

export const ChildrenSubModuls = ({ roleId, pathModule, pathSubModule }: Props) => {
  const [childrenSubModuls, setChildrenSubModules] = useState<SubModuls[]>([])

  const getModuls = async () => {
    const data = await getModuleService(roleId)
    const subModules = data.find((item) => item.path === pathModule)?.childModules as SubModuls[]
    const childrenSubModulsFind = subModules.find((item) => item.path === pathSubModule) ?.childModules
setChildrenSubModules(childrenSubModulsFind as SubModuls[])
  }

  useEffect(() => {
    getModuls()
  }, [])
  return (
    <>
      {childrenSubModuls.length > 0 && (
        <div className='justify-center items-center gap-3 md:gap-7 flex md:grid-cols-2 px-3 pt-5 md:pl-40 md:pr-40 '>
          {childrenSubModuls.map(({ id, name, path, urlImg }) => (
            <div onClick={()=>{
              SubSubmodule(name)
            }}>
            <Card
              className='flex justify-center items-center w-60 h-44 card'
              key={id}
              to={`${path}`}
            >
              <div className='flex items-center' style={{ zIndex: 10 }}>
                <picture className='text-center'>
                  <img alt='' src={`${SERVER_BASE_URL}/Imgs/${urlImg}`} />
                </picture>
                <h1 className='font-bold text-primary text-center'>{name}</h1>
              </div>
            </Card>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
