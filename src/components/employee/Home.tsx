import { Employee } from "@/types/employee"
import Financial from "./Financial"


export default function EmployeeHome(employee: Employee) {
  return (
    <main className="m-5">
      <Financial employee={employee}/>
    </main>
  )
}