import { Employee } from "@/types/employee";
import { Paycheck, Payroll } from "@/types/payroll";
import { getEmployeePayment, getPaymentHistory } from "../../utils/request";
import { useQuery } from "@tanstack/react-query";
import { forwardRef } from "react"

type Prop = {
    id: string
}
type Ref = React.ForwardedRef<HTMLDialogElement>
const PaycheckModal = forwardRef<HTMLDialogElement, Prop>(({ id }, ref: Ref) => {
    const { data: payment, isPending, isError } = useQuery<Paycheck>({
        queryKey: ['paycheck', { userId: id }],
        queryFn: () => getEmployeePayment(id)
    })

    const totalEarnings = payment?.earnings.reduce((acc, item) => acc + item.value, 0) || 0;

    const totalDeductions = payment?.deductions.reduce((acc, item) => acc + item.value, 0) || 0;

    const netSalary = totalEarnings - totalDeductions;

    const formatCurrency = (value: number) => value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });
    return (
        <dialog ref={ref} className="modal modal-bottom sm:modal-middle">
            <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title text-2xl">
                Holerite - {payment?.referencePeriod.getMonth().toLocaleString('pt-BR')}
                </h2>

                <div className="divider" />

                <div className="grid md:grid-cols-2 gap-4">
                <div>
                    <p>
                    <strong>Funcionário:</strong> {payment?.employeeName}
                    </p>
                    <p>
                    <strong>Matrícula:</strong> {payment?.employeeId}
                    </p>
                </div>

                <div>
                    <p>
                    <strong>Cargo:</strong> {payment?.postion}
                    </p>
                    <p>
                    <strong>Departamento:</strong> {payment?.departmentName}
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
                        {payment?.earnings.map((item, index) => (
                            <tr key={index}>
                            <td>{item.description}</td>
                            <td className="text-right">
                                {formatCurrency(item.value)}
                            </td>
                            </tr>
                        ))}
                        </tbody>

                        <tfoot>
                        <tr>
                            <th>Total</th>
                            <th className="text-right">
                            {formatCurrency(totalEarnings)}
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
                        {payment?.deductions.map((item, index) => (
                            <tr key={index}>
                            <td>{item.description}</td>
                            <td className="text-right">
                                {formatCurrency(item.value)}
                            </td>
                            </tr>
                        ))}
                        </tbody>

                        <tfoot>
                        <tr>
                            <th>Total</th>
                            <th className="text-right">
                            {formatCurrency(totalDeductions)}
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
                    {formatCurrency(totalEarnings)}
                    </div>
                </div>

                <div className="stat">
                    <div className="stat-title">Descontos</div>
                    <div className="stat-value text-error">
                    {formatCurrency(totalDeductions)}
                    </div>
                </div>

                <div className="stat">
                    <div className="stat-title">Salário Líquido</div>
                    <div className="stat-value text-primary">
                    {formatCurrency(netSalary)}
                    </div>
                </div>
                </div>
            </div>
            </div>

            <div className="modal-box">
                <h3 className="font-bold text-lg">Hello!</h3>
                <p className="py-4">Press ESC key or click the button below to close</p>
                <div className="modal-action">
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn">Close</button>
                </form>
                </div>
            </div>
        </dialog>
    )
})

export default PaycheckModal;