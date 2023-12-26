import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table'
import React, { useEffect, useState } from 'react'

import { Button } from '@/features/common/components/ui/Button'
import { InputField } from '@/features/common/components/ui/Form'
import { SwitchField } from '@/features/common/components/ui/Form/SwitchField'
import { Table } from '@/features/common/components/ui/Table'

import type { Datum } from '../services/bankService'
import { getBanks, updateBanks, getResponseSpecialCondition,ResponseSpecialCondition } from '../services/bankService'
import { ModalEditBanksForm } from './ModalEditBanksForm'
import { ConceptsBank } from './conceptsBank/BankingConcept'
import { ModalSpecialConditions } from '../components/ModalSpecialConditions'

const columnHelper = createColumnHelper<Datum>()

export const BanksTable: React.FC = () => {
  const [allDataTable, setAllDataTable] = useState<Datum[]>([])
  const [isCheckRow, setIsCheckRow] = useState<number | null>(null)
  const [pageSize, setPageSize] = useState(10)
  const [conteo, setConteo] = useState(1)
  const [countData, setCountData] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [ultimaPagina, setUltimaPagina] = useState(0)
  const [conditionSpecial, setConditionSpecial] = useState<ResponseSpecialCondition[] | null>(null)
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
    columnHelper.accessor('code', {
      header: 'Código'
    }),
    columnHelper.accessor('name', {
      header: 'Nombre'
    }),
    columnHelper.accessor('nit', {
      header: 'Nit'
    }),

    columnHelper.accessor('isActive', {
      header: 'Estado',
      cell: ({ row: { original } }) => (
        <div className='flex justify-center items-center'>
          <SwitchField
            checked={original.isActive!}
            onChange={async () => {
              await updateBanks(original.id!, { isActive: !original.isActive! })
              await getTableBanks(currentPage, 10)
            }}
          />
        </div>
      )
    }),
    columnHelper.accessor('Actions', {
      header: 'Acciones',
      cell: ({ row }) => {
        const [showModalEdit, setShowModalEdit] = useState(false)
        const [showModalConceptos, setShowModalConceptos] = useState(false)
        const [showModalSpecialConditions, setShowModalSpecialConditions] = useState(false)
        const [selectedBank, setSelectedBank] = useState<Datum | null>(null)

        return (
          <>
            <Button
              className={
                !(isCheckRow === row.original.id) ? 'bg-primaryBorder mr-2' : 'bg-secondary mr-2'
              }
              disabled={!(isCheckRow === row.original.id)}
              onClick={() => {
                setShowModalEdit(true)
                setSelectedBank(row.original)
              }}
            >
              <span className='icon-file-pen text-primaryText-50' />
            </Button>
            <Button
              className={!(isCheckRow === row.original.id) ? 'bg-primaryBorder mr-2' : 'bg-red-500'}
              disabled={!(isCheckRow === row.original.id)}
              onClick={() => {
                setShowModalConceptos(true)
                setSelectedBank(row.original)
              }}
            >
              <span className='icon-lightbulb text-primaryText-50' />

            </Button>

            <Button
              className={
                !(isCheckRow === row.original.id) ? 'bg-primaryBorder mr-2' : 'bg-secondary mr-2 ml-2'
              }
              disabled={!(isCheckRow === row.original.id)}
              onClick={() => {
                setShowModalSpecialConditions(true)
                setSelectedBank(row.original)

                const conditionSpecials = async () => {
                  try {
                    const response = await getResponseSpecialCondition({ BankId: row.original.id })
                    setConditionSpecial(response)
                  }
                  catch (error) {
                    alert(error)
                  }
                }
              }}
            >
              <span className='icon-file-pen text-primaryText-50' />
            </Button>


            {showModalEdit && (
              <ModalEditBanksForm
                isActive={row.original.isActive!}
                selectedBank={selectedBank}
                setShowModal={setShowModalEdit}
                showModal={showModalEdit}
                getListBanks={GetData}
              />
            )}
            {showModalConceptos && (
              <ConceptsBank
                setShowModalTable={setShowModalConceptos}
                showModal={showModalConceptos}
                selectedBank={row.original}
              />
            )}

            {showModalSpecialConditions && (
              <ModalSpecialConditions
                setShowModal={setShowModalSpecialConditions}
                showModal={showModalSpecialConditions}
                bankId={row.original.id}
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

  const getTableBanks = async (pageIndex: number, pageSize: number) => {
    const data = await getBanks({
      PageIndex: pageIndex,
      PageSize: pageSize
    });
    setAllDataTable(data.data)
    const ultimo = (data.count / 10).toString().split(".")
    setUltimaPagina(ultimo.length == 1 ? parseInt(ultimo[ultimo.length - 1]) : parseInt(ultimo[ultimo.length - 2]) + 1)
    setCountData(data.data.length)
  }

  const GetData = () => {
    getTableBanks(currentPage, 10)
  }

  useEffect(() => {
    getTableBanks(1, 10)
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
                getTableBanks(currentPage - 1, 10)
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
                getTableBanks(currentPage + 1, 10)
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
