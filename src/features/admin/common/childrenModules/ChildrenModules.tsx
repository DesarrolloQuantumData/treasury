import { useEffect, useState } from 'react'

import type { SubModuls } from '@/features/admin/services/moduleService'
import { getModuleService } from '@/features/admin/services/moduleService'
import { SERVER_BASE_URL } from '@/features/common/consts/app.js'
import { BreadCrumbs } from '../../../../features/common/components/navbar/BreadCrumbs'
import { Card } from '../../../common/components/ui/Card.tsx/index.js'
import { Submodule } from '../../../../features/common/components/navbar/BreadCrumbs';

interface Props {
  roleId: string
  pathModule: string
}

export const ChildrenModules = ({ roleId, pathModule }: Props) => {
  const [subModuls, setSubModuls] = useState<SubModuls[]>([])
  const [pageData, setPageData] = useState<string[]>([])
  const getModuls = async () => {
    const data = await getModuleService(roleId)
    const subModulsFind = data.find((item) => item.path === pathModule)?.childModules
    setSubModuls(subModulsFind as SubModuls[])
  }

  useEffect(() => {
    getModuls()
  }, [])

  return (
    <>
      {subModuls.length > 0 && (
        <div className='justify-center items-center gap-3 md:gap-7 grid md:grid-cols-6 pt-5 md:pl-40 md:pr-40'>
          {subModuls.map(({ id, name, path, urlImg }) => (
            <div onClick={() => {
              Submodule(name)
            }}>
              <Card
                className='flex justify-center items-center w-60 h-20 card'
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