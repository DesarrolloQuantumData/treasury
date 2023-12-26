export interface AlertTitleProps {
  children: React.ReactNode
}

export const AlertTitle: React.FC<AlertTitleProps> = ({ children }) => {
  return <h3 className='text-md font-bold'>{children}</h3>
}
