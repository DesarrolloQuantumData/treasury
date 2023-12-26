import { useRoutes } from 'react-router-dom'

import authRoutes from '@/features/auth/routes'
import { useAuthStore } from '@/features/auth/store/AuthContext'

import adminRoutes from './features/admin/routes'

export const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAuthStore()
  const roleRoutes = isAuthenticated ? [...authRoutes, ...adminRoutes] : authRoutes

  const routes = useRoutes(roleRoutes)
  return <>{routes}</>
}
