export interface TableFooterProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLTableSectionElement>,
    HTMLTableSectionElement
  > {}

export const TableFooter: React.FC<TableFooterProps> = ({ children, ...restOfProps }) => {
  return <tfoot {...restOfProps}>{children}</tfoot>
}
