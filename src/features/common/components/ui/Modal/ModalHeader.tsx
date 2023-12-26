export interface ModalHeaderProps {
  children: React.ReactNode
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({ children }) => {
  return <header className='flex items-center justify-between gap-2 p-4'>{children}</header>
}
