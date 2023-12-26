import type { RouteObject } from '@/features/common/types'
import { lazyImport } from '@/features/common/utils/lazyImport'

import { FinancialManagement } from './pages/financialManagement'
import { AccountsPage } from './pages/financialManagement/accounts'
import { CashFlowConceptsPage } from './pages/financialManagement/cashFlowConcepts'
import { CompaniesPage } from './pages/financialManagement/companies'
import { ConceptsPage } from './pages/financialManagement/concepts'
import { InterfacesPage } from './pages/financialManagement/interfaces'
import { BanksPage } from './pages/financialManagement/sources/banks'
import { Sources } from './pages/financialManagement/sources/Sources'
import { ThirdPartiesPage } from './pages/financialManagement/sources/thirdParties'
import { BankBalance } from './pages/files/BankBalance'
import { BankBalancePage } from './pages/files/listOfBankBalancesPreviousDay'
const { HomePage } = lazyImport(() => import('@/features/admin/pages/homePage'), 'HomePage')

const adminRoutes: RouteObject[] = [
  {
    path: '/home',
    element: <HomePage />
  },
  {
    path: 'gestion-financiera',
    element: <FinancialManagement />,
    children: [
      {
        index: true,
        element: <AccountsPage />
      },
      {
        path: 'cuentas',
        element: <AccountsPage />
      },
      {
        path: 'empresas',
        element: <CompaniesPage />
      },
      {
        path: 'conceptos-presupuestales',
        element: <CashFlowConceptsPage />
      },
      {
        path: 'conceptos',
        element: <ConceptsPage />
      },
      {
        path: 'interfaces',
        element: <InterfacesPage />
      }
    ]
  },
  {
    path: 'gestion-financiera/bancos-fuentes',
    element: <Sources />,
    children: [
      {
        element: <BanksPage />
      },
      {
        path: 'bancos',
        element: <BanksPage />
      },
      {
        path: 'terceros',
        element: <ThirdPartiesPage />
      }
    ]
  },
  {
    path: '/archivos',
    element: <BankBalance />,
    children: [
      {
        element: <BankBalancePage/>
      }
    ]
  },
  {
    path: '/saldos',
    element: <h1>Saldos</h1>
  },
  {
    path: '/libro-tesoreria',
    element: <h1>Libro Tesorería</h1>
  },
  {
    path: '/indicadores',
    element: <h1>Indicadores</h1>
  },
  {
    path: '/recaudos',
    element: <h1>Recaudos</h1>
  },
  {
    path: '/informes',
    element: <h1>Informes</h1>
  },
  {
    path: '/creditos-cupos',
    element: <h1>Créditos y Cupos</h1>
  },
  {
    path: '/permisos-usuarios',
    element: <h1>Permisos Usuarios</h1>
  },
  {
    path: '/usuarios',
    element: <h1>Usuarios</h1>
  }
]

export default adminRoutes
