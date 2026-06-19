import { mdiCalendarEdit, mdiHelpCircleOutline, mdiNoteText, mdiPrinter } from "@mdi/js";
import { Icon } from "@mdi/react";
import { useNavigate } from "react-router-dom"

import { RefObject } from 'react';

interface Props {
  paycheckModal: RefObject<HTMLDialogElement | null>;
}

export default function QuickActions ({ paycheckModal }: Props) {
  const navigate = useNavigate();

  return <div className="flex justify-end m-2">
    <ul className="menu menu-horizontal bg-base-200 rounded-box">
      <li>
        {/* Bater ponto */}
        <div className="tooltip" data-tip="Bater ponto!">
          <button onClick={() => navigate('/')}>
            <Icon path={mdiCalendarEdit} size={1}></Icon>
          </button>
        </div>
        
      </li>
      <li>
        {/* Holerite */}
        <div className="tooltip" data-tip="Visualizar Holerite">
          <button onClick={() => paycheckModal.current?.showModal()}>
            <Icon path={mdiNoteText} size={1}></Icon>
          </button>
        </div>
      </li>
      <li>
        {/* Ajuda do RH */}
        <div className="tooltip" data-tip="Ajuda!">
          <button onClick={() => navigate('/')}>
            <Icon path={mdiHelpCircleOutline} size={1}></Icon>
          </button>
        </div>
      </li>
    </ul>
  </div>
}