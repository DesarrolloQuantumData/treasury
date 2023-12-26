export interface ModalFooterProps {
  children: React.ReactNode
}

export const ModalFooter: React.FC<ModalFooterProps> = ({ children }) => {
  return <footer className='flex items-center justify-end gap-2 p-4'>{children}</footer>
}
