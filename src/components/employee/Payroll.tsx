import { getPayrollHistory } from "../../utils/request"
import { useQuery } from "@tanstack/react-query"
import Spinner from "../Spinner"
import { Payroll } from "@/types/payroll"
import { formatCurrency, getPeriod } from "../../utils/utils"
import { PayrollDetailsResponse } from "@/types/dto"
import PaycheckModal from "./PaycheckModal"
import { useRef, useState } from "react"
import { mdiFile, mdiPrinter } from "@mdi/js"
import {Icon} from "@mdi/react"

type Prop = {
    id: string
}

export default function PayrollTable ({ id }: Prop) {
    const [selectedPayroll, setSelectedPayroll] = useState('');

    const { data: payrolls, isPending, isError } = useQuery({
        queryKey: ['payrolls', id],
        queryFn: () => getPayrollHistory(id)
    })

    const paycheckModalRef = useRef<HTMLDialogElement>(null);

    function handlePaycheckModal (id: string) {
        setSelectedPayroll(id)
        paycheckModalRef.current?.showModal()
    }

    return (
        <>
            {isPending ? <Spinner ></Spinner>: <></>}
            {payrolls ? (
                <div className="overflow-x-auto">
                    <h1 className="text-2xl font-bold m-3">Payment History</h1>
                    <table className="table">
                    {/* head */}
                    <thead>
                    <tr>
                        <th></th>
                        <th>Period</th>
                        <th>Payment Day</th>
                        <th>Net Amount</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/* row 1 */}
                    {payrolls.map((p: Payroll, i: number) => (
                        <tr key={p.id}>
                            <th>{i + 1}</th>
                            <td>{getPeriod(p.period)}</td>
                            <td>{p.paymentDate?.toLocaleDateString('pt-BR')}</td>
                            <td>{formatCurrency(p.netAmount)}</td>
                            <td>
                                <button
                                    className="btn btn-xs btn-soft btn-info"
                                    onClick={() => handlePaycheckModal(p.id)}
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
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <PaycheckModal id={selectedPayroll} ref={paycheckModalRef} ></PaycheckModal>
            </div>
        ) : <></>}
        </>
    )
}