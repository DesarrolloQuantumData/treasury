import '@/features/common/assets/global.css'
import 'react-toastify/dist/ReactToastify.css'

import { Providers } from '@/providers'
import { AppRoutes } from '@/routes'

const App: React.FC = () => {
  return (
    <Providers>
      <AppRoutes />
    </Providers>
  )
}

export default App
