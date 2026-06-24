import { mdiCalendarEdit, mdiHelpCircleOutline, mdiNoteText, mdiPrinter } from "@mdi/js";
import { Icon } from "@mdi/react";
import { useNavigate } from "react-router-dom"

import { memo, useRef } from 'react';
import ClockInOutModal from "../ClockInOut";

type Props = {
  employeeId: string
}

const QuickActions = ({employeeId}: Props) => {
  const clockInOutModal = useRef<HTMLDialogElement | null>(null);

  return <div className="flex justify-end m-2">
    <div className="tooltip" data-tip="To Clock In!">
      <button className="btn btn-primary" onClick={() => {
        clockInOutModal.current?.showModal()
      }}>
        To clock in <Icon path={mdiCalendarEdit} size={1}></Icon>
      </button>
    </div>
    <ClockInOutModal employeeId={employeeId} ref={clockInOutModal} />
  </div>
}


export default QuickActions;