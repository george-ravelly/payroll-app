import { PayrollDetailsResponse, PayrollSummaryResponse, UserLoginSchema } from "../types/dto";
import { Employee, EmployeeSchema } from "../types/employee";
import { mockEmployee, mockPayroll, mockPayrolls } from "./mock";
import { Payroll, PayrollSchema } from "../types/payroll";
import { UserLogin } from "../types/dto";
import { getErrorsMessage } from "./utils";

// Cache db
const API_DB = {
    payrolls: [...mockPayrolls],
    employees: [{...mockEmployee}],
    lastPayroll: mockPayroll
}

const BASE_URL = import.meta.env.VITE_APP_BASE_URL


export async function getPayroll (id: string): Promise<PayrollDetailsResponse> {
    if (!id) throw new Error("Employee is required!");

    const response = await fetch(`${BASE_URL}/api/payrolls/latest?employeeId=${id}`)
    const data: PayrollDetailsResponse = await response.json();

    console.log(data);

    return data

    
    // await new Promise(resolve => (
    //     setTimeout(resolve, 1000)
    // ));
    // let payroll: Payroll;
    // if (!id) {
    //     const validPayroll = PayrollSchema.safeParse(API_DB.payrolls
    //         [0]
    //     )
    //     if (validPayroll.success) payroll = validPayroll.data;
    //     else throw new Error("Invalid payroll object: " +  validPayroll.error.message);
        
    // }
    // else {
    //     const validPayroll = PayrollSchema.safeParse(
    //         API_DB.payrolls.find(m => m.id === id) || API_DB.lastPayroll
    //     )
    //     if (validPayroll.success) payroll = validPayroll.data;
    //     else  throw new Error("Invalid payroll object: " +  validPayroll.error.message);
    // }
    // const {employee, ...lastPayroll} = {...payroll}

    // const payrollDetails: PayrollDetailsResponse = {
    //     ...lastPayroll,
    //     employeeId: employee.id,
    //     employeeName: employee.name,
    //     departmentName: employee.departmentName,
    //     positionName: employee.position
    // }

    // return payrollDetails;
}

export async function getEmployee(id: string): Promise<Employee> {
    try {
        const { data } = await ((await fetch(`${BASE_URL}/api/employees/${id}`)).json());
        const validEmployee = EmployeeSchema.safeParse(data);
        if (validEmployee.success) return validEmployee.data;
        else throw new Error("Invalid employee object: "+ getErrorsMessage(validEmployee.error))
    } catch (error) {
        throw new Error(getErrorsMessage(error));
    }
}

export async function loginWithEmailAndCpf(credentials: UserLogin): Promise<Employee> {
    try {
        const response = await fetch(`${BASE_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
        const data = await response.json();

        const validLogin = UserLoginSchema.safeParse(data);

        if (validLogin.success) {
            const validEmployee = EmployeeSchema.safeParse(data);
            if (validEmployee.success) return validEmployee.data;
            else throw new Error("Employee: " + getErrorsMessage(validEmployee.error.message));
        }
        
        throw new Error("Invalid CPF or E-mail!");
    } catch (error) {
        // todo
        throw new Error("Invalid CPF or E-mail!");
    }
}


export async function getPayrollHistory(id: string): Promise<Payroll[]> {
    try {
        const response = await fetch(`${BASE_URL}/api/payrolls/history/${id}`)
        const data = await response.json();

        if (data.length === 0) return data;
        // const validPayrolls: Payroll[] = data.map((pay: Payroll) => {
        //     const payroll = PayrollSchema.safeParse(pay);
        //     if (payroll.success) return payroll.data;
        //     else throw new Error("Error to parse payroll: " + getErrorsMessage(payroll.error))
        // })
        // return validPayrolls;
        return data;
    } catch (error) {
        throw new Error(getErrorsMessage(error));
    }
}

export async function createEmployee(employee: Employee) {
    try {
        const response = await fetch(`${BASE_URL}/api/employees`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(employee)
        });
        const data = await response.json();
        const validEmployee = EmployeeSchema.safeParse(data);

        if (validEmployee.success) return validEmployee.data;
        else throw new Error("Error to validate employee object: " + getErrorsMessage(validEmployee.error));
    } catch (error) {
        throw new Error("Error to create employee " + getErrorsMessage(error))
    }
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
