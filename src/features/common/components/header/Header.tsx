import { Navbar } from '../navbar/Navbar'
import { Wrapper } from '../wrapper/Wrapper'

export const Header: React.FC = () => {
  return (
    <header className='shadow bg-primaryBackground border-b-2 '>
      <Wrapper size='full'>
        <Navbar />
      </Wrapper>
    </header>
  )
}
