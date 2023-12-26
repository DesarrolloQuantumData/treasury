import { useState } from 'react'

import { SERVER_BASE_URL } from '@/features/common/consts'
import { Button } from '@/features/common/components/ui/Button'
import { ModalFormStyle } from '@/features/common/components/ui/Modal/modalStyle/ModalFormStyle'
import {TableListOfInterfaceFields} from '../ListOfInterfaceFields/components/TableListOfInterfaceFields'
import {ModalListOfInterfaceFieldsForm} from '../ListOfInterfaceFields/components/ModalListOfInterfaceFieldsForm'
import {Datum} from '../../services/interfaceService'
import {getExcelListOfInterfaceFields} from '../../components/ListOfInterfaceFields/services/ListOfInterfaceFieldsSevice'
interface propConceptsBanks {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
  selectedInterface: Datum| null
  showModal: boolean
}

export const ModalListOfInterfaceFields:React.FC<propConceptsBanks> = ({ setShowModal, showModal, selectedInterface }) => {

const CloseModal=()=>{
  setShowModal(false)
}

const [showModalListOfInterfaceFields,setshowModalListOfInterfaceFields]=useState(false)
  const downloadExcelFile = async () => {
    console.log()
    try {
        const response = await getExcelListOfInterfaceFields()
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
    <ModalFormStyle
    dataModalForm={{
      firstTitle: 'Lista De Campos De La Interface',
      secondTitle: selectedInterface?.bankName
    }}
    onClose={CloseModal}
    showModal={showModal}
  >
    <div className='m-20 bg-slate-50 p-5 border-2 rounded-xl'>
      <div className='flex flex-col sm:flex-row sm:justify-between items-center border-b-2  border-inherit w-full pb-5 mb-5'>
        <h2 className='font-bold text-2xl sm:text-xl pb-5 sm:pb-0 text-primaryText-400 text-center sm:text-left mr-5'>
        </h2>
        <div className='w-full sm:max-w-min '>
          <Button
            className='w-full px-11 bg-secondary transition-all hover:bg-secondary-50 hover:ring-2 hover:ring-secondary hover:text-secondary'
            onClick={() => setshowModalListOfInterfaceFields(true)}
            rounded='xl'
          >
            <span className='icon-circle-plus' />
            Nuevo
          </Button>
        </div>
      </div>
      <TableListOfInterfaceFields InterfaceId={selectedInterface?.id}/>
      {<ModalListOfInterfaceFieldsForm setShowModal={setshowModalListOfInterfaceFields} showModal={showModalListOfInterfaceFields} InterfaceId={selectedInterface?.id}/>}
    </div>
  </ModalFormStyle>
  )
}