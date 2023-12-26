import { Outlet } from 'react-router-dom'

import { ChildrenSubModuls } from '@/features/admin/common/childrenSubModules/ChildrenSubModules'
import { useAuthStore } from '@/features/auth/store/AuthContext'
import Layout from '@/features/common/components/layout/Layout'

export const Sources = () => {
  const { roleId } = useAuthStore()

  return (
    <Layout>
      <div className='flex items-center'>
        <h1 className='text-2xl text-primaryText md:pl-40'>Gestión Financiera</h1>
      </div>
      <div className='flex justify-center items-center'>
        <h1 className='text-2xl text-primaryText '>Lista de Fuentes</h1>
      </div>
      {roleId && (
        <ChildrenSubModuls
          pathModule='gestion-financiera'
          pathSubModule='bancos-fuentes'
          roleId={roleId}
        />
      )}
      <Outlet />
    </Layout>
  )
}
