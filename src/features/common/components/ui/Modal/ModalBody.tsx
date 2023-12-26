import { Spinner } from '@/features/common/components/ui/Spinner'

export interface ModalBodyProps {
  children: React.ReactNode
  loading?: boolean
}

export const ModalBody: React.FC<ModalBodyProps> = ({ children, loading }) => {
  return (
    <div className='p-4'>
      {loading ? (
        <div className='flex justify-center'>
          <Spinner size='md' />
        </div>
      ) : (
        children
      )}
    </div>
  )
}
