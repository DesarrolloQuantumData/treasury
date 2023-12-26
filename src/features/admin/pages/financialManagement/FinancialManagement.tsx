import { Outlet } from 'react-router-dom'

import { useAuthStore } from '@/features/auth/store/AuthContext'
import Layout from '@/features/common/components/layout/Layout'

import { ChildrenModules } from '../../common/childrenModules/ChildrenModules'
export const FinancialManagement = () => {
  const { roleId } = useAuthStore()

  return (
    <Layout>
      <div className='flex items-center'>
        <h1 className='text-2xl text-primaryText pl-2 md:pl-40'>Gestión Financiera</h1>
      </div>
      {roleId && <ChildrenModules pathModule='gestion-financiera' roleId={roleId} />}
      <Outlet />
    </Layout>
  )
}
