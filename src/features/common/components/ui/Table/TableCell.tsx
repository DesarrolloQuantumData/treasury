export interface TableCellProps
  extends React.DetailedHTMLProps<
    React.ThHTMLAttributes<HTMLTableCellElement>,
    HTMLTableCellElement
  > {}

export const TableCell: React.FC<TableCellProps> = ({ children, ...restOfProps }) => {
  return (
    <th
      {...restOfProps}
      className={`font-normal py-3 px-6 whitespace-nowrap bg-primaryBackground-200 ${restOfProps.className}`}
    >
      {children}
    </th>
  )
}
