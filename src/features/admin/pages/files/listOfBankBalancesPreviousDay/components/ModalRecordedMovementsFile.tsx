import { useState } from 'react'

import { SERVER_BASE_URL } from '@/features/common/consts'
import { Button } from '@/features/common/components/ui/Button'
import { ModalFormStyle } from '@/features/common/components/ui/Modal/modalStyle/ModalFormStyle'
interface ModalRecordedMovementsFileProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
  showModal: boolean
}

export const ModalRecordedMovementsFile:React.FC<ModalRecordedMovementsFileProps> = ({ setShowModal, showModal }) => {

const CloseModal=()=>{
  setShowModal(false)
}

  return (
    <ModalFormStyle
    dataModalForm={{
      firstTitle: 'Lista de Movimientos',
      secondTitle: "Registrados En El Archivo"
    }}
    onClose={CloseModal}
    showModal={showModal}
  >
    <div className='m-20 bg-slate-50 p-5 border-2 rounded-xl'>
      {/* <TableListOfInterfaceFields InterfaceId={selectedInterface?.id}/> */}
    </div>
  </ModalFormStyle>
  )
}