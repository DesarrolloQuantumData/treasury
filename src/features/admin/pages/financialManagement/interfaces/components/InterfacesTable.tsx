import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import { Button } from '@/features/common/components/ui/Button'
import { InputField } from '@/features/common/components/ui/Form'
import { SelectField } from '@/features/common/components/ui/Form/SelectField'
import { SwitchField } from '@/features/common/components/ui/Form/SwitchField'
import { type Datum } from '../services/interfaceService'
import { Table } from '@/features/common/components/ui/Table'
import { getInterfaces, updaInterfaces } from '../services/interfaceService'
import { getDefaultSelectOption } from '@/features/common/utils/defaults'
import { useAccountsSelects } from './accountsForm/useAccountsSelects'
import { ModalEditInterfaces } from '../components/ModalEditInterfaces'
import { ModalListOfInterfaceFields } from '../components/ListOfInterfaceFields/ModalListOfInterfaceFields'
const columnHelper = createColumnHelper<Datum>()

export const InterfacesTable: React.FC = () => {

  const [allDataTable, setAllDataTable] = useState<Datum[]>([])
  const [isCheckRow, setIsCheckRow] = useState<number | null>(null)
  const [pageSize, setPageSize] = useState(10)
  const [conteo, setConteo] = useState(1)
  const [countData, setCountData] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [ultimaPagina, setUltimaPagina] = useState(0)
  const [filterSelected, setFilterSelected] = useState(false)
  const [valorSelected, setValorSelected] = useState(0)

  const selects = useAccountsSelects()

  const { bankName } = selects

  const defaultOption = getDefaultSelectOption({}, '--Banco--')

  const columns = [
    columnHelper.accessor('id', {
      id: 'checkbox',
      header: () => <InputField disabled type='checkbox' />,
      cell: ({ row: { original } }) => {
        return (
          <div className='flex justify-center items-center'>
            <InputField
              checked={isCheckRow === original.id}
              onChange={(e) => {
                if (original.id === undefined) return
                if (e.target.checked) {
                  setIsCheckRow(original.id)
                } else {
                  setIsCheckRow(null)
                }
              }}
              type='checkbox'
            />
          </div>
        )
      }
    }),
    columnHelper.accessor('bankName', {
      id: 'selectField',
      header: () => (
        <SelectField options={[defaultOption, ...bankName]}
          onChange={async (event: React.ChangeEvent<HTMLSelectElement>) => {
            getFilter(1, parseInt(event.target.value))
            setFilterSelected(true)
            setCurrentPage(1)
          }} />
      )
    }),
    columnHelper.accessor('description', {
      header: 'Descripción / Nombre Interface'
    }),
    columnHelper.accessor('fileTypeName', {
      header: 'Tipo Archivo'
    }),
    columnHelper.accessor('separatorTypeName', {
      header: 'Tipo Separador'
    }),
    columnHelper.accessor('isActive', {
      header: 'Estado',
      cell: ({ row: { original } }) => (
        <div className='flex justify-center items-center'>
          <SwitchField
            checked={original.isActive!}
            onChange={async () => {
              await updaInterfaces(original.id!, { isActive: !original.isActive! })
              if (!filterSelected) {
                getTableConcepts(currentPage, 10)
              }
              else {
                getFilter(currentPage, valorSelected)
              }
            }}
          />
        </div>
      )
    }),
    columnHelper.accessor('Actions', {
      header: 'Acciones',
      cell: ({ row }) => {
        const [showModalEdit, setShowModalEdit] = useState(false)
        const [selectedInterface, setSelectedInterface] = useState<Datum | null>(null)
        const [listOfInterfaceFieldsSelected, setListOfInterfaceFieldsSelected] = useState(false)
        return (
          <>
            <Button
              className={
                !(isCheckRow === row.original.id) ? 'bg-primaryBorder mr-2' : 'bg-secondary mr-2'
              }
              disabled={!(isCheckRow === row.original.id)}
              onClick={() => {
                setShowModalEdit(true)
                setSelectedInterface(row.original)
              }}
            >
              <span className='icon-file-pen text-primaryText-50' />
            </Button>


            <Button
              className={!(isCheckRow === row.original.id) ? 'bg-primaryBorder' : 'bg-red-500'}
              disabled={!(isCheckRow === row.original.id)}
              onClick={() => {
                setListOfInterfaceFieldsSelected(true)
                setSelectedInterface(row.original)
              }}
            >
              <span className='icon-lightbulb text-primaryText-50' />
            </Button>

            {showModalEdit && (
              <ModalEditInterfaces
                setShowModal={setShowModalEdit}
                showModal={showModalEdit}
                selectedInterface={selectedInterface}
                isActive={row.original.isActive!}
                getDataInterfaces={GetData}
              />
            )}


            {listOfInterfaceFieldsSelected && (
              <ModalListOfInterfaceFields
              setShowModal={setListOfInterfaceFieldsSelected}
              showModal={listOfInterfaceFieldsSelected}
              selectedInterface={selectedInterface}
              />
            )}
          </>
        )
      }
    })
  ]

  const table = useReactTable({
    columns,
    data: allDataTable,
    getCoreRowModel: getCoreRowModel()
  })

  const GetData = () => {
    getTableConcepts(currentPage, 10)
  }

  const getFilter = async (currentPage: number, filter: number) => {
    const data = await getInterfaces({
      PageIndex: currentPage,
      PageSize: 10,
      BankId: filter
    });
    setAllDataTable(data.data)
    const ultimo = (data.count / 10).toString().split(".")
    setUltimaPagina(ultimo.length == 1 ? parseInt(ultimo[ultimo.length - 1]) : parseInt(ultimo[ultimo.length - 2]) + 1)
    setCountData(data.data.length)
    setValorSelected(filter)
  }

  const getTableConcepts = async (pageIndex: number, pageSize: number) => {
    const data = await getInterfaces({
      PageIndex: pageIndex,
      PageSize: pageSize
    });
    setAllDataTable(data.data)
    const ultimo = (data.count / 10).toString().split(".")
    setUltimaPagina(ultimo.length == 1 ? parseInt(ultimo[ultimo.length - 1]) : parseInt(ultimo[ultimo.length - 2]) + 1)
    setCountData(data.data.length)
  }

  useEffect(() => {
    getTableConcepts(1, 10)
  }, [])

  return (
    <>
      <Table>
        <Table.Header className='rounded-2xl'>
          {table.getHeaderGroups().map((headerGroup) => (
            <Table.Row className='text-primary normal-case' key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Table.HeaderCell key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </Table.HeaderCell>
              ))}
            </Table.Row>
          ))}
        </Table.Header>
        <Table.Body>
          {table.getRowModel().rows.map((row) => (
            <Table.Row key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <Table.Cell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
          {allDataTable.length === 0 && (
            <Table.Row>
              <Table.Cell className='italic text-center text-gray-500' colSpan={100}>
                No hay Registros
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>

      <div className='flex sm:justify-between flex-col md:flex-row items-center mt-4 gap-5'>
        <p className='text-xs text-primaryText-50 mr-5'>{`Mostrando ${(currentPage - 1) * pageSize + 1} - ${Math.min(
          currentPage * pageSize,
          allDataTable.length
        )} de ${allDataTable.length} registros`}</p>
        <div className='grid grid-cols-6 items-center gap-2 font-semibold'>
          <Button
            className='relative bg-primary bg-opacity-40 rounded-lg inline-flex col-span-1'
            onClick={() => {
              if (currentPage > 1) {
                setConteo(conteo - 1)
                setCurrentPage(currentPage - 1)
                if (!filterSelected) {
                  getTableConcepts(currentPage - 1, 10)
                }
                else {
                  getFilter(currentPage - 1, valorSelected)
                }
              }
            }}
          >
            <span className='text-primary icon-chevron-left' />
          </Button>
          {countData > 0 && <Button className='w-12 h-10 col-span-1'>{currentPage}</Button>}
          {conteo < ultimaPagina && countData > 0 && <Button className='w-12 h-10 bg-opacity-10 text-primary-700 col-span-1'><span className='text-primary'>{currentPage + 1}</span> </Button>}
          {(conteo + 1) < ultimaPagina && countData > 0 && <Button className='w-12 h-10 bg-opacity-10 text-primary-700 col-span-1'><span className='text-primary'>{(conteo + 2) < ultimaPagina ? "..." : currentPage + 2}</span> </Button>}
          {(conteo + 2) < ultimaPagina && countData > 0 && <Button className='w-12 h-10 bg-opacity-10 text-primary-700 col-span-1'><span className='text-primary'>{ultimaPagina} </span></Button>}
          <Button
            className='relative bg-primary bg-opacity-40 rounded-lg inline-flex col-span-1'
            onClick={() => {
              if (currentPage >= Math.ceil(allDataTable.length / pageSize) && currentPage < ultimaPagina) {
                setConteo(conteo + 1)
                setCurrentPage(currentPage + 1)
                if (!filterSelected) {
                  getTableConcepts(currentPage + 1, 10)
                }
                else {
                  getFilter(currentPage + 1, valorSelected)
                }
              }
            }}
          >
            <span className='text-primary icon-chevron-right' />
          </Button>
        </div>
      </div>
    </>
  )
}
