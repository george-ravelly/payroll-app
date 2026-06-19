import { Employee } from "@/types/employee"
import { Paycheck, Payroll } from "@/types/payroll"
import { getEmployeePayment } from "../../utils/request"
import { useQuery, useQueryClient } from "@tanstack/react-query"

export default function LastPayment({ userId }: { userId: string }) {

    const { data: payment, isError, isPending } = useQuery<Paycheck>({
        queryKey: ['payment', userId],
        queryFn: () => getEmployeePayment(userId)
    })

    const totalEarnings = payment?.earnings.reduce((acc, item) => acc + item.value, 0) || 0;

    const totalDeductions = payment?.deductions.reduce((acc, item) => acc + item.value, 0) || 0;

    const netSalary = totalEarnings - totalDeductions;

    return <>
        <div className="stats shadow flex">
            <div className="stat">
                <div className="stat-figure text-primary">
                {/* <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block h-8 w-8 stroke-current"
                >
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    ></path>
                </svg> */}
                </div>
                <div className="stat-title">Gross Salary</div>
                <div className="stat-value text-primary">{totalEarnings.toLocaleString('pt-BR', { style: "currency", currency: "brl"})}</div>
                {/* <div className="stat-desc">21% more than last month</div> */}
            </div>
            <div className="stat">
                <div className="stat-title">Net Salary</div>
                <div className="stat-value text-primary">{netSalary.toLocaleString('pt-BR', { style: "currency", currency: "brl"})}</div>
                {/* <div className="stat-desc">21% more than last month</div> */}
            </div>

            <div className="stat">
                {/* <div className="stat-figure text-secondary">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block h-8 w-8 stroke-current"
                >
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                    ></path>
                </svg>
                </div> */}
                <div className="stat-title">Total Deductions</div>
                <div className="stat-value text-secondary">{payment?.totalDeductions.toLocaleString('pt-BR', { style: "currency", currency: "brl"})}</div>
                <div className="stat-desc"></div>
            </div>
        </div>
        <div>
            <ul className="list bg-base-100 rounded-box shadow-md">
                
                <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">Deductions</li>
                {payment?.deductions.map((i, index) => (
                    <li className="list-row" key={index}>
                        <div className="text-4xl font-thin opacity-30 tabular-nums">{index + 1}</div>
                        <div>
                            <div>{i.type}</div>
                            <div className="text-xs uppercase font-semibold opacity-60">{i.description}</div>
                        </div>
                        <div>
                            {i.value.toLocaleString('pt-BR', {
                                style: 'currency', currency: 'brl'
                            })}
                        </div>
                    </li>
                ))}                
            </ul>
        </div>
    </>
}