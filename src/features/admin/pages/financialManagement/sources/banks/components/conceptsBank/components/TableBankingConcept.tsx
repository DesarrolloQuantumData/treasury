import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table'

import React, { useEffect, useState } from 'react'
import { getConcepts, updateConceptBank, Datum } from '../services/ConceptsBanksServices'

import { Button } from '@/features/common/components/ui/Button'
import { InputField } from '@/features/common/components/ui/Form'
import { SwitchField } from '@/features/common/components/ui/Form/SwitchField'
import { Table } from '@/features/common/components/ui/Table'
import { ModalEditBankingConcept } from './ModalEditBankingConcept'
const columnHelper = createColumnHelper<Datum>()

interface ConceptsBankTableProps {
  selectedBank: Datum
}

export const ConceptsBankTable: React.FC<ConceptsBankTableProps> = ({ selectedBank }) => {
  const [allDataTableConcept, setAllDataTableConcept] = useState<Datum[]>([])
  const [isCheckRow, setIsCheckRow] = useState<number | null>(null)
  const [pageSize, setPageSize] = useState(10)
  const [conteo, setConteo] = useState(1)
  const [countData, setCountData] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [ultimaPagina, setUltimaPagina] = useState(0)

  const getTableConceptsBanks = async (pageIndex: number, pageSize: number) => {
    const BankingConcept = await getConcepts({
      id: selectedBank?.bankId,
      PageIndex: pageIndex,
      PageSize: pageSize
    });
    setAllDataTableConcept(BankingConcept.data)
    const ultimo = (BankingConcept.count / 10).toString().split(".");
    setUltimaPagina(parseInt(ultimo[ultimo.length - 2]) + 1);
    setCountData(BankingConcept.data.length);
  }

  useEffect(() => {
    getTableConceptsBanks(1, 10);
  }, []);

  const columns = [
    columnHelper.accessor('id', {
      id: 'checkbox',
      header: () => <InputField type='checkbox' />,
      cell: ({ row: { original } }) => {
        return (
          <div className='flex justify-center items-center'>
            <InputField
              checked={isCheckRow === original.id}
              onChange={(e) => {
                if (original.id === undefined) return
                if (e.target.checked) {
                  setIsCheckRow(original.id)
                }
                else {
                  setIsCheckRow(null)
                }
              }}
              type='checkbox'
            />
          </div>
        )
      }
    }),
    columnHelper.accessor('name', {
      header: 'Concepto bancario'
    }),
    columnHelper.accessor('internalConceptName', {
      header: 'Concepto/Interno'
    }),
    columnHelper.accessor('bankName', {
      header: 'Banco'
    }),
    columnHelper.accessor('natureTypeName', {
      header: 'Nutaraleza'
    }),
    columnHelper.accessor('isActive', {
      header: 'Estado',
      cell: ({ row: { original } }) => (
        <div className='flex justify-center items-center'>
          <SwitchField
            checked={original.isActive!}
            onChange={async () => {
              await updateConceptBank(original.id!, { isActive: !original.isActive! })
              await getTableConceptsBanks(currentPage, 10)
            }}
          />
        </div>
      )
    }),
    columnHelper.accessor('Actions', {
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
              <span className='icon-file-pen text-primaryText-50' />
            </Button>
            {showModalEdit && (
              <ModalEditBankingConcept
                selectedBank={selectedBank}
                selectedCompany={row.original}
                showModal={showModalEdit}
                setShowModal={setShowModalEdit}
                getTableCompanies={getTableConceptsBanks}

              />
            )}
          </>
        )
      }
    })
  ]
  const table = useReactTable({
    columns,
    data: allDataTableConcept,
    getCoreRowModel: getCoreRowModel()
  })

  const getTableCompanies = async (pageIndex: number, pageSize: number) => {
    const data = await getConcepts({
      PageIndex: pageIndex,
      PageSize: pageSize,
      id: selectedBank.id
    });
    setAllDataTableConcept(data.data)
    const ultimo = (data.count / 10).toString().split(".")
    setUltimaPagina(parseInt(ultimo[ultimo.length - 2]) + 1)
    setCountData(data.data.length)
  }

  useEffect(() => {
    setTimeout(() => {
      getTableCompanies(1, 10)
    }, 50);
   
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
          {allDataTableConcept.length === 0 && (
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
          allDataTableConcept.length
        )} de ${allDataTableConcept.length} registros`}</p>
        <div className='grid grid-cols-6 items-center gap-2 font-semibold'>
          <Button
            className='relative bg-primary bg-opacity-40 rounded-lg inline-flex col-span-1'
            onClick={() => {
              if (currentPage > 1) {
                setConteo(conteo - 1)
                setCurrentPage(currentPage - 1)
                getTableConceptsBanks(currentPage - 1, 10)
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
              if (currentPage >= Math.ceil(allDataTableConcept.length / pageSize) && allDataTableConcept.length == 10) {
                setConteo(conteo + 1)
                setCurrentPage(currentPage + 1)
                getTableConceptsBanks(currentPage + 1, 10)
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