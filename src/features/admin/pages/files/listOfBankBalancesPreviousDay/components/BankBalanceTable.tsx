import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table'
import { useEffect, useState } from 'react'

import { Datum, getBankBalance } from '../services/BankBalanceServices'
import { InputField, SelectField } from '@/features/common/components/ui/Form'
import { Button } from '@/features/common/components/ui/Button'
import { Table } from '@/features/common/components/ui/Table'
import { getDefaultSelectOption } from '@/features/common/utils/defaults'
import { useAccountsSelects } from '../../../financialManagement/accounts/components/accountsForm/useAccountsSelects'
import {ModalRecordedMovementsFile} from './ModalRecordedMovementsFile'

const columnHelper = createColumnHelper<Datum>()

export const BankBalanceTable: React.FC = () => {
  const [allDataTable, setAllDataTable] = useState<Datum[]>([])
  const [isCheckRow, setIsCheckRow] = useState<number | null>(null)
  const [pageSize, setPageSize] = useState(10)
  const [conteo, setConteo] = useState(1)
  const [countData, setCountData] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [ultimaPagina, setUltimaPagina] = useState(0)
  const [filterSelected, setFilterSelected] = useState(false)

  const [dateList, setDateList] = useState<Date | null>(null)
  const [companyId, setcompanyId] = useState<number | null>(null)
  const [bankId, setBankId] = useState<number | null>(null)
  const [acccountId, setAcccountId] = useState<number | null>(null)

  const [bank, setBank] = useState("Banco")
  const [Company, setCompany] = useState("Empresa")
  const [account, setAccount] = useState("Cuenta")
  const selects = useAccountsSelects()
  const { bankName, companyName, accounts } = selects
  const defaultOption = getDefaultSelectOption({}, Company)
  const defaultOption2 = getDefaultSelectOption({}, bank)
  const defaultOption3 = getDefaultSelectOption({}, account)


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
    columnHelper.accessor('date', {
      header: () => (
        <div className='relative'>
          <InputField
            type='date'
            onChange={async (event) => {
              const data = await getBankBalance(
                {
                  PageIndex: currentPage,
                  PageSize: 10,
                  DateList:new Date(event.target.value),
                  CompanyId: parseInt(event.target.value),
                  BankId: bankId,
                });
              setDateList(new Date(event.target.value))
              setAllDataTable(data.data)
              const ultimo = (data.count / 10).toString().split(".")
              setUltimaPagina(ultimo.length == 1 ? parseInt(ultimo[ultimo.length - 1]) : parseInt(ultimo[ultimo.length - 2]) + 1)
              setCountData(data.data.length)
              setFilterSelected(true)
            }}
          />
          <span className='absolute text-lg top-2 left-3 icon-address-card text-primaryText-50' />
        </div>
      )
    }),

    columnHelper.accessor('companyName', {
      header: () => (
        <div className='relative'>
          <SelectField options={[defaultOption, ...companyName]} onChange={async (event: React.ChangeEvent<HTMLSelectElement>) => {
            const data = await getBankBalance(
              {
                PageIndex: currentPage,
                PageSize: 10,
                DateList:dateList,
                CompanyId: parseInt(event.target.value),
                BankId: bankId
              });
            const selectedOption = event.target.options[event.target.selectedIndex];
            setCompany(selectedOption.textContent || '')
            setcompanyId(parseInt(event.target.value))
            setAllDataTable(data.data)
            const ultimo = (data.count / 10).toString().split(".")
            setUltimaPagina(ultimo.length == 1 ? parseInt(ultimo[ultimo.length - 1]) : parseInt(ultimo[ultimo.length - 2]) + 1)
            setCountData(data.data.length)
            setFilterSelected(true)
          }} />
          <span className='absolute text-lg top-2 left-3 icon-address-card text-primaryText-50' />
        </div>
      )
    }),
    columnHelper.accessor('bankName', {
      header: () => (
        <div className='relative'>
          <SelectField labelPosition='right' options={[defaultOption2, ...bankName]} onChange={async (event: React.ChangeEvent<HTMLSelectElement>) => {
            const data = await getBankBalance(
              {
                PageIndex: currentPage,
                PageSize: 10,
                DateList:dateList,
                CompanyId: companyId,
                BankId: parseInt(event.target.value)
              });
            const selectedOption = event.target.options[event.target.selectedIndex];
            setBank(selectedOption.textContent || '')
            setBankId(parseInt(event.target.value))
            setAllDataTable(data.data)
            const ultimo = (data.count / 10).toString().split(".")
            setUltimaPagina(ultimo.length == 1 ? parseInt(ultimo[ultimo.length - 1]) : parseInt(ultimo[ultimo.length - 2]) + 1)
            setCountData(data.data.length)
            setFilterSelected(true)
          }} />
          <span className='absolute text-lg top-2 left-3 icon-address-card text-primaryText-50' />
        </div>
      )
    }),
    columnHelper.accessor('account', {
      header: () => (
        <div className='relative'>
          <SelectField labelPosition='right' options={[defaultOption3, ...accounts]} onChange={async (event: React.ChangeEvent<HTMLSelectElement>) => {
            const data = await getBankBalance(
              {
                PageIndex: currentPage,
                PageSize: 10,
                DateList:dateList,
                CompanyId: companyId,
                BankId: parseInt(event.target.value)
              });
            const selectedOption = event.target.options[event.target.selectedIndex];
            setAccount(selectedOption.textContent || '')
            setAcccountId(parseInt(event.target.value))
            setAllDataTable(data.data)
            const ultimo = (data.count / 10).toString().split(".")
            setUltimaPagina(ultimo.length == 1 ? parseInt(ultimo[ultimo.length - 1]) : parseInt(ultimo[ultimo.length - 2]) + 1)
            setCountData(data.data.length)
            setFilterSelected(true)
          }} />
          <span className='absolute text-lg top-2 left-3 icon-address-card text-primaryText-50' />
        </div>
      )
    }),
    columnHelper.accessor('userId', {
      header: 'Usuario'
    }),
    columnHelper.accessor('fileName', {
      header: 'Nombre Archivo'
    }),
    columnHelper.accessor('state', {
      header: 'Estado'
    }),
    columnHelper.accessor('actions', {
      header: 'Acciones',
      cell: ({ row }) => {
        const [showModalEdit, setShowModalEdit] = useState(false)
        return (
          <>
            <Button
              className={
                !(isCheckRow === row.original.id) ? 'bg-primaryBorder mr-2' : 'bg-secondary mr-2'
              }
              disabled={!(isCheckRow === row.original.id)}
              onClick={() => {
                setShowModalEdit(true)
              }}
            >
               <ModalRecordedMovementsFile
                setShowModal={setShowModalEdit}
                showModal={showModalEdit}
              />
              <span className='icon-file-pen text-primaryText-50' />
            </Button>
            <Button
              className={
                !(isCheckRow === row.original.id) ? 'bg-primaryBorder mr-2' : 'bg-secondary mr-2'
              }
              disabled={!(isCheckRow === row.original.id)}
              onClick={() => {
                setShowModalEdit(true)
              }}
            >
              <span className='icon-file-pen text-primaryText-50' />
            </Button>
            <Button
              className={
                !(isCheckRow === row.original.id) ? 'bg-primaryBorder mr-2' : 'bg-secondary mr-2'
              }
              disabled={!(isCheckRow === row.original.id)}
              onClick={() => {
                setShowModalEdit(true)
              }}
            >
              <span className='icon-file-pen text-primaryText-50' />
            </Button>
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

  const GetData = async () => {
    const data = await getBankBalance(
      {
        PageIndex: 1,
        PageSize: pageSize
      });
    setAllDataTable(data.data)
    const ultimo = (data.count / 10).toString().split(".")
    setUltimaPagina(ultimo.length == 1 ? parseInt(ultimo[ultimo.length - 1]) : parseInt(ultimo[ultimo.length - 2]) + 1)
    setCountData(data.data.length)
  }

  const getFilter = async (pageIndex: number, pageSize: number) => {
    const data = await getBankBalance(
      {
        PageIndex: pageIndex,
        PageSize: pageSize
      });
    setAllDataTable(data.data)
    const ultimo = (data.count / 10).toString().split(".")
    setUltimaPagina(ultimo.length == 1 ? parseInt(ultimo[ultimo.length - 1]) : parseInt(ultimo[ultimo.length - 2]) + 1)
    setCountData(data.data.length)
  }

  const getBankBalances = async (pageIndex: number, pageSize: number) => {

  }

  useEffect(() => {
    GetData()
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
                  getBankBalances(currentPage - 1, 10)
                }
                else {
                  getFilter(currentPage - 1, 10)
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
              if (currentPage >= Math.ceil(allDataTable.length / pageSize) && allDataTable.length == 10 && currentPage < ultimaPagina) {
                setConteo(conteo + 1)
                setCurrentPage(currentPage + 1)
                if (!filterSelected) {
                  getBankBalances(currentPage + 1, 10)
                }
                else {
                  getFilter(currentPage + 1, 10)
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