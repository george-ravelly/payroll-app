import { useQuery } from "@tanstack/react-query"
import LastPayment from "./Paycheck"
import { Employee } from "@/types/employee"
import QuickActions from "./QuickActions"
import { MiniGraph } from "./SalaryHistory"
import { useRef, useState } from "react"
import PaycheckModal from "./Payroll "


export default function EmployeeHome(employee: Employee) {
  const [ openPaycheck, setOpenPaycheck ] = useState<boolean>(false);
  const paycheckModalRef = useRef<HTMLDialogElement>(null);

  return (
    <div>
      <h1 className="m-4 text-center">Hello, {employee.name || 'George'}!</h1>
      <QuickActions paycheckModal={paycheckModalRef} />
      <PaycheckModal id={employee.id} ref={paycheckModalRef} />
      <LastPayment userId={employee.id} />
      <MiniGraph userId={employee.id} />
    </div>
  )
}