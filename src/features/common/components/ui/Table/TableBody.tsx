export interface TableBodyProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLTableSectionElement>,
    HTMLTableSectionElement
  > {}

export const TableBody: React.FC<TableBodyProps> = ({ children, ...restOfProps }) => {
  return (
    <tbody
      {...restOfProps}
      className={`text-gray-600 text-sm py-5 font-light ${restOfProps.className}`}
    >
      {children}
    </tbody>
  )
}
