import { PayrollDetailsResponse, PayrollSummaryResponse } from "../types/dto";
import { Employee, EmployeeSchema } from "../types/employee";
import { mockEmployee, mockPayroll, mockPayrolls } from "./mock";
import { Payroll, PayrollSchema } from "../types/payroll";
import { UserLogin } from "../types/dto";

// Cache db
const API_DB = {
    payrolls: [...mockPayrolls],
    employees: [{...mockEmployee}],
    lastPayroll: mockPayroll
}

export async function getPayroll (id: string): Promise<PayrollDetailsResponse> {
    await new Promise(resolve => (
        setTimeout(resolve, 1000)
    ));
    let payroll: Payroll;
    if (!id) {
        const validPayroll = PayrollSchema.safeParse(API_DB.payrolls
            [0]
        )
        if (validPayroll.success) payroll = validPayroll.data;
        else throw new Error("Invalid payroll object: " +  validPayroll.error.message);
        
    }
    else {
        const validPayroll = PayrollSchema.safeParse(
            API_DB.payrolls.find(m => m.id === id) || API_DB.lastPayroll
        )
        if (validPayroll.success) payroll = validPayroll.data;
        else  throw new Error("Invalid payroll object: " +  validPayroll.error.message);
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
    const validEmployee = EmployeeSchema.safeParse({...API_DB.employees.find(e => e.id === id)});
    if (validEmployee.success) return validEmployee.data;
    else throw new Error("Invalid employee object: "+ validEmployee.error.message)
}

export async function loginWithEmailAndCpf(credentials: UserLogin): Promise<Employee> {
    await new Promise(resolve => (
        setTimeout(resolve, 400)
    ));

    const employee = API_DB.employees.find(e => (
        e.email === credentials.email && e.cpf === credentials.cpf
    ));

    const validEmployee = EmployeeSchema.safeParse(employee);
    if (validEmployee.success) return validEmployee.data;

    throw new Error("Invalid email or CPF");
}


export async function getPayrollHistory(id: string): Promise<Payroll[]> {
    await new Promise(resolve => (
        setTimeout(resolve, 1000)
    ));

    return API_DB.payrolls;
}

export async function createEmployee(employee: Employee) {
    await new Promise(resolve => (
        setTimeout(resolve, 400)
    ));

    API_DB.employees.push(employee)
    return employee;
}


export async function createPayroll(payroll: Payroll) {
    await new Promise(resolve => (
        setTimeout(resolve, 400)
    ));

    API_DB.payrolls.push(payroll)
    API_DB.lastPayroll = API_DB.payrolls[API_DB.payrolls.length - 1]
    return payroll;
}

export async function deletePayroll (id: string) {
    await new Promise(resolve => (
        setTimeout(resolve, 400)
    ));

    if (API_DB.payrolls.length === 0) return;
    const index = API_DB.payrolls.findIndex(p => p.id === id);
    const removedPayroll = API_DB.payrolls.splice(index, 1);
    return removedPayroll;
}
