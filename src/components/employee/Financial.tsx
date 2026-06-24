import { PayrollDetailsResponse } from "@/types/dto";
import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { getlatestPayroll } from "../../utils/request";
import {Icon} from "@mdi/react";
import { mdiFile, mdiPrinter } from "@mdi/js";
import PayrollTable from "./Payroll";
import PaycheckModal from "./PaycheckModal";
import { getPeriod } from "../../utils/utils";
import { EmployeeProps } from "@/types/props";

export default function Financial ({employee}: EmployeeProps) {
    const { data: userPaycheck,  isPending, isError } = useQuery<PayrollDetailsResponse>({
        queryKey: ['payrollDetails', {id: employee.id}],
        queryFn: () => getlatestPayroll(employee.id)
    });

    const paycheckModalRef = useRef<HTMLDialogElement>(null);

    return (<>
        {isPending ? 
            <span className="loading loading-ring loading-lg"></span> : <></>}
        {userPaycheck ? (
        <div>
            <div className="stats stats-vertical sm:stats-horizontal bg-base-100 border-base-300 border">
                <div className="stat">
                    <div className="stat-title">Net Amount</div>
                    <div className="stat-value">
                        {userPaycheck.netAmount.toLocaleString('pt-BR', { style: "currency", currency: "brl"}) || 0}
                    </div>
                    <div className="stat-actions">
                    <div className="badge badge-soft badge-success">+ {userPaycheck.totalEarnings.toLocaleString('pt-BR', { style: "currency", currency: "brl"}) || 0}</div>
                    <div className="ms-1 badge badge-soft badge-error">- {userPaycheck.totalDeductions.toLocaleString('pt-BR', { style: "currency", currency: "brl"}) || 0}</div>
                    </div>
                </div>

                <div className="stat">
                    <div className="stat-title">Refereced Period</div>
                    <div className="stat-value">{getPeriod(userPaycheck.period)}</div>
                    <div className="stat-actions">
                    <button
                        className="btn btn-xs btn-soft btn-info"
                        onClick={() => paycheckModalRef.current?.showModal()}
                    >
                        <Icon path={mdiFile} size={0.6}></Icon>
                        <span>
                            Ver Holerite
                        </span>
                    </button>
                    <button className="ms-1 btn btn-xs btn-soft btn-primary">
                        <Icon path={mdiPrinter} size={0.6}></Icon>
                        <span>
                            Baixar PDF
                        </span>
                    </button>
                    </div>
                </div>
                 <div className="stat">
                    <div className="stat-title">Status: {userPaycheck.status}</div>
                    <div className="stat-value">
                        {userPaycheck.paymentDate?.toLocaleDateString() || new Date().toLocaleDateString()}
                    </div>
                    <div className="stat-desc">
                        Last payment
                    </div>
                </div>
            </div>
            <PaycheckModal id={userPaycheck.id} ref={paycheckModalRef} />
            <PayrollTable id={employee.id} />
        </div>
        ) : <></>}
    </>);
}