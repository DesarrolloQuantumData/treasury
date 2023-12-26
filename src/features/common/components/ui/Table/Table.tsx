import { TableBody } from '@/features/common/components/ui/Table/TableBody'
import { TableCell } from '@/features/common/components/ui/Table/TableCell'
import { TableFooter } from '@/features/common/components/ui/Table/TableFooter'
import { TableHeader } from '@/features/common/components/ui/Table/TableHeader'
import { TableHeaderCell } from '@/features/common/components/ui/Table/TableHeaderCell'
import { TableRow } from '@/features/common/components/ui/Table/TableRow'

export interface TableProps
  extends React.DetailedHTMLProps<React.TableHTMLAttributes<HTMLTableElement>, HTMLTableElement> {
  wrapperProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
}

const TableRoot: React.FC<TableProps> = ({ children, wrapperProps, ...restOfProps }) => {
  return (
    <div
      {...wrapperProps}
      className={`relative scrollbar overflow-x-auto text-gray-500 rounded text-left ${wrapperProps?.className}`}
    >
      <table
        {...restOfProps}
        className={`min-w-max w-full table-auto text-center ${restOfProps.className}`}
      >
        {children}
      </table>
    </div>
  )
}

export const Table = Object.assign(TableRoot, {
  Header: TableHeader,
  HeaderCell: TableHeaderCell,
  Body: TableBody,
  Footer: TableFooter,
  Cell: TableCell,
  Row: TableRow
})
