import { PayrollDetailsResponse, PayrollSummaryResponse } from "@/types/dto";
import { Employee } from "@/types/employee";
import { mockEmployee, mockPayroll, mockPayrolls } from "./mock";
import { Payroll } from "@/types/payroll";

export async function getPayroll (id: string): Promise<PayrollDetailsResponse> {
    await new Promise(resolve => (
        setTimeout(resolve, 1000)
    ));
    let payroll: Payroll;
    if (!id) payroll = mockPayrolls[0]
    else {
        payroll = mockPayrolls.find(m => m.id === id) || mockPayroll;
    }
    const {employee, ...lastPayroll} = {...payroll}

    const payrollDetails: PayrollDetailsResponse = {
        ...lastPayroll,
        employeeId: employee.id,
        employeeName: employee.name,
        departmentName: employee.departmentName,
        positionName: employee.position
    }

    return payrollDetails;
}

export async function getEmployee(id: string): Promise<Employee> {
    await new Promise(resolve => (
        setTimeout(resolve, 500)
    ));

    return {...mockEmployee}
}


export async function getPayrollHistory(id: string): Promise<Payroll[]> {
    await new Promise(resolve => (
        setTimeout(resolve, 1000)
    ));

    return mockPayrolls;
}