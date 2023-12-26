export interface TableRowProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLTableRowElement>, HTMLTableRowElement> {}

export const TableRow: React.FC<TableRowProps> = ({ children, ...restOfProps }) => {
  return (
    <tr {...restOfProps} className={`border-b border-gray-200  ${restOfProps.className}`}>
      {children}
    </tr>
  )
}
