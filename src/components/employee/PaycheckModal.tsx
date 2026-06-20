import { formatCurrency, getPeriod } from "../../utils/utils";
import { ForwardedRef } from "react";
import { forwardRef } from "react"
import { useQuery } from "@tanstack/react-query";
import { getPayroll } from "../../utils/request";

type Prop = {
    id: string
}
type Ref = ForwardedRef<HTMLDialogElement>

const PaycheckModal = forwardRef<HTMLDialogElement, Prop>((
    { id }, ref: Ref
) => {
    const { data: payroll, isPending, isError } = useQuery({
        queryKey: ['paycheckModal', id],
        queryFn: () => getPayroll(id)
    })

    return (
    <>
    <dialog 
        id="paycheck-modal"
        ref={ref} 
        className="modal"
    >
        {payroll ? 
        <div className="modal-box w-full" style={{height: '80vh', width: '90vw', maxWidth: '1200px'}}>
            <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title text-2xl">
                Holerite - {getPeriod(payroll.period)}
                </h2>

                <div className="divider" />

                <div className="grid md:grid-cols-2 gap-4">
                <div>
                    <p>
                        <strong>Funcionário:</strong> {payroll?.employeeName}
                    </p>
                    <p>
                    <strong>Matrícula:</strong> {payroll?.employeeId}
                    </p>
                </div>

                <div>
                    <p>
                        <strong>Cargo:</strong> {payroll?.positionName}
                    </p>
                    <p>
                        <strong>Departamento:</strong> {payroll?.departmentName}
                    </p>
                </div>
                </div>

                <div className="divider" />

                <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <h3 className="font-bold text-success mb-2">
                        Proventos
                    </h3>

                    <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        <thead>
                        <tr>
                            <th>Descrição</th>
                            <th className="text-right">Valor</th>
                        </tr>
                        </thead>

                        <tbody>
                        {payroll?.items.filter(item => item.type === 'EARNING').map((item, index) => (
                            <tr key={index}>
                                <td>{item.description}</td>
                                <td className="text-right">
                                    {formatCurrency(item.amount)}
                                </td>
                            </tr>
                        ))}
                        </tbody>

                        <tfoot>
                        <tr>
                            <th>Total</th>
                            <th className="text-right">
                                {formatCurrency(payroll.totalEarnings)}
                            </th>
                        </tr>
                        </tfoot>
                    </table>
                    </div>
                </div>

                <div>
                    <h3 className="font-bold text-error mb-2">
                        Descontos
                    </h3>

                    <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        <thead>
                        <tr>
                            <th>Descrição</th>
                            <th className="text-right">Valor</th>
                        </tr>
                        </thead>

                        <tbody>
                        {payroll?.items.filter(item => item.type === 'DEDUCTION').map((item, index) => (
                            <tr key={index}>
                                <td>{item.description}</td>
                                <td className="text-right">
                                    {formatCurrency(item.amount)}
                                </td>
                            </tr>
                        ))}
                        </tbody>

                        <tfoot>
                        <tr>
                            <th>Total</th>
                            <th className="text-right">
                            {formatCurrency(payroll.totalDeductions)}
                            </th>
                        </tr>
                        </tfoot>
                    </table>
                    </div>
                </div>
                </div>

                <div className="divider" />

                <div className="stats shadow">
                <div className="stat">
                    <div className="stat-title">Salário Bruto</div>
                    <div className="stat-value text-success">
                    {formatCurrency(payroll.totalEarnings)}
                    </div>
                </div>

                <div className="stat">
                    <div className="stat-title">Descontos</div>
                    <div className="stat-value text-error">
                    {formatCurrency(payroll.totalDeductions)}
                    </div>
                </div>

                <div className="stat">
                    <div className="stat-title">Salário Líquido</div>
                    <div className="stat-value text-primary">
                    {formatCurrency(payroll.netAmount)}
                    </div>
                </div>
                </div>
            </div>
            </div>
            <div className="modal-action">
            <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">Close</button>
            </form>
            </div>
        </div> : <></>}
    </dialog>
    </>
)})

export default PaycheckModal;