import { type ReactNode, Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import { AuthProvider } from '@/features/auth/store/AuthContext'
import { PageLoader } from '@/features/common/components/ui/PageLoader'
import { PUBLIC_URL } from '@/features/common/consts'

interface ProvidersProps {
  children: ReactNode
}
export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <AuthProvider>
      <BrowserRouter basename={PUBLIC_URL}>
        <ToastContainer position='top-right' />
        <Suspense fallback={<PageLoader />}>{children}</Suspense>
      </BrowserRouter>
    </AuthProvider>
  )
}
