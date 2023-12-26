import type { ReactNode } from 'react'

import { Header } from '../header/Header'
import type { WrapperProps } from '../wrapper/Wrapper'
import { Wrapper } from '../wrapper/Wrapper'

type LayoutProps = {
  children: ReactNode
  className?: string
  backButton?: boolean
  wrapperSize?: WrapperProps['size']
  pageSize?: number
}

const Layout: React.FC<LayoutProps> = ({ children, wrapperSize, className = '' }) => {
  return (
    <div className='min-h-screen bg-primaryBackground-200'>
      <Header />
      <div className={`p-0 h-screen ${className}`} style={{minHeight:'1180px'}}>
        <Wrapper size={wrapperSize}>
            {children}
        </Wrapper>
      </div>
    </div>
  )
}

export default Layout
