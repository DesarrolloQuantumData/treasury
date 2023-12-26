import { Navigate } from 'react-router-dom'

import { type RouteObject } from '@/features/common/types'
import { lazyImport } from '@/features/common/utils/lazyImport'

const { LoginPage } = lazyImport(() => import('@/features/auth/pages'), 'LoginPage')

export const authRoutes: RouteObject[] = [
  {
    path: '/',
    element: <LoginPage />
  },

  {
    path: '*',
    element: <Navigate replace to='/' />
  }
]

export default authRoutes
