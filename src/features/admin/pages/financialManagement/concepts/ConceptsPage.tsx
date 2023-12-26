import { useState, useEffect } from 'react'

import { Button } from '@/features/common/components/ui/Button'

import { ConceptsTable } from './components/ConceptsTable'
import { ModalConceptsForm } from './components/ModalConceptsForm'
import { SERVER_BASE_URL } from '@/features/common/consts'
import{ getExcelConcepts} from '../concepts/services/ConceptsServices'

export const ConceptsPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false)
  const downloadExcelFile = async () => {
    try {
      const response = await getExcelConcepts()
      if (response && response.value) {
        const downloadUrl = response.value
        const url = `${SERVER_BASE_URL}/${downloadUrl}`
        const a = document.createElement('a')
        a.style.display = 'none'
        a.href = url
        document.body.appendChild(a)
        a.click()
      } else {
        console.error('Respuesta no válida o falta la URL de descarga')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }
  return (
    <div className='m-20 bg-slate-50 p-5 border-2 rounded-xl'>
      <div className='flex flex-col sm:flex-row sm:justify-between items-center border-b-2  border-inherit w-full pb-5 mb-5'>
        <h2 className='font-bold text-2xl sm:text-xl pb-5 sm:pb-0 text-primaryText-400 text-center sm:text-left mr-5'>
          Lista de Conceptos Internos
        </h2>
        <div className='w-full sm:max-w-min '>
          <Button
            className='w-full px-11 bg-secondary transition-all hover:bg-secondary-50 hover:ring-2 hover:ring-secondary hover:text-secondary'
            onClick={() => setShowModal(true)}
            rounded='xl'
          >
            <span className='icon-circle-plus' />
            Nuevo
          </Button>
        </div>
      </div>
      <ConceptsTable />
      <ModalConceptsForm setShowModal={setShowModal} showModal={showModal} />
      <div className='flex justify-end mt-5 items-center'>
        <Button
          className='w-full sm:max-w-min bg-secondary hover:bg-secondary-50 transition-all hover:ring-2 hover:ring-secondary hover:text-secondary'
          rounded='xl'
          onClick={downloadExcelFile}
        >
          <span className='icon-circle-down' />
          Descargar
        </Button>
      </div>
    </div>
  )
}
