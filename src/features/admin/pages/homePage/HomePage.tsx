import { useEffect, useState } from 'react'

import { useAuthStore } from '@/features/auth/store/AuthContext'
import Layout from '@/features/common/components/layout/Layout'
import { Card } from '@/features/common/components/ui/Card.tsx'
import { SERVER_BASE_URL } from '@/features/common/consts'

import type { GetModuls } from '../../services/moduleService'
import { getModuleService } from '../../services/moduleService'
import { Module } from '../../../../features/common/components/navbar/BreadCrumbs';

export const HomePage = () => {
  const { roleId } = useAuthStore()
  const [moduls, setModuls] = useState<GetModuls[]>([])

  const getModuls = async (roleId: string) => {
    const data = await getModuleService(roleId)
    setModuls(data)
  }

  useEffect(() => {
    if (roleId) {
      getModuls(roleId)
    }
  }, [roleId])

  return (
    <Layout>
      <div className='flex items-center'>
        <span className='icon-bell text-xl text-primary pl-48 pr-2' />
        <h1 className='text-2xl text-primaryText'>Sistema de Tesorería</h1>
      </div>
      <div className='gap-y-6 md:gap-x-7 lg:gap-x-12 grid sm:grid-cols-2 md:grid-cols-4 md:mx-11 lg:mx-40 pt-5'>
          {moduls.map(({ id, name, urlImg, path }) => (
            <div onClick={() => {
              Module(name)
            }}>
            <Card
              className='flex justify-center items-center w-60 h-44 card'
              key={id}
              to={`/${path}`}
            >
              <div className='flex items-center' style={{ zIndex: 100 }}>
                <picture className='text-center'>
                  <img alt='' src={`${SERVER_BASE_URL}/Imgs/${urlImg}`} />
                </picture>
                <h1 className='font-bold text-primary text-center'>{name}</h1>
              </div>
            </Card>
            </div>
          ))}
      </div>
    </Layout>
  )
}
