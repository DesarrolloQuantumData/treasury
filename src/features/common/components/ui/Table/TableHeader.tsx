export interface TableHeaderProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLTableSectionElement>,
    HTMLTableSectionElement
  > {}

export const TableHeader: React.FC<TableHeaderProps> = ({ children, ...restOfProps }) => {
  return (
    <thead
      {...restOfProps}
      className={`bg-[#CCE6E3] text-white uppercase text-sm leading-normal${restOfProps.className}`}
    >
      {children}
    </thead>
  )
}
