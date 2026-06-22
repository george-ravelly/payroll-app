import {Icon} from "@mdi/react";
import { EmployeeProps } from "../types/props";
import { mdiClose, mdiCross } from "@mdi/js";

export default function HelpComponent ({employee}: EmployeeProps) {
    return <div>
        <div className="fab">
            {/* a focusable div with tabIndex is necessary to work on all browsers. role="button" is necessary for accessibility */}
            <div tabIndex={0} role="button" className="btn btn-lg btn-circle btn-primary">F</div>

            {/* Main Action button replaces the original button when FAB is open */}
            <div className="fab-main-action">
                <button className="btn btn-circle btn-secondary btn-lg">
                    <Icon path={mdiClose} size={1} />
                </button>
            </div>

            {/* buttons that show up when FAB is open */}
            <div className="card bg-base-200 w-96 shadow-sm">
            {/* <figure>
                <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Shoes" />
            </figure> */}
                <div className="card-body">
                    <h2 className="card-title">Formulário</h2>
                    <input type="text" placeholder="Type here" className="input w-full" />
                    <textarea className="textarea" placeholder="Bio"></textarea>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">Enviar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
}