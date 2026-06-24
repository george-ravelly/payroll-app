import { EmployeeSchedule, EmployeeSchedulerSchema, PayrollDetailsReponseSchema, PayrollDetailsResponse, UserLoginSchema } from "../types/dto";
import { Employee, EmployeeSchema } from "../types/employee";
import { Payroll } from "../types/payroll";
import { UserLogin } from "../types/dto";
import { getErrorsMessage } from "./utils";


// @ts-ignore: ignore environment variable type error
const BASE_URL = import.meta.env.VITE_APP_BASE_URL

/**
 * 
 * @param id employee id
 * @returns latest payroll
 */
export async function getlatestPayroll (id: string): Promise<PayrollDetailsResponse> {
    if (!id) throw new Error("Employee id is required!");

    const response = await fetch(`${BASE_URL}/api/payrolls/latest?employeeId=${id}`);
    const data = await response.json();
    
    const validPayrollDatails = PayrollDetailsReponseSchema.safeParse(data);

    if (validPayrollDatails.success) return validPayrollDatails.data;
    else throw new Error(`Error to get payroll: ${getErrorsMessage(validPayrollDatails.error)}`);
}
/**
 * 
 * @param id payroll id
 * @returns a payroll
 */
export async function getPayrollById (id: string): Promise<PayrollDetailsResponse> {
    if (!id) throw new Error("Payroll id is required!");

    const response = await fetch(`${BASE_URL}/api/payrolls/${id}`);
    const data = await response.json();
    
    const validPayrollDatails = PayrollDetailsReponseSchema.safeParse(data);

    if (validPayrollDatails.success) return validPayrollDatails.data;
    else throw new Error(`Error to get payroll: ${getErrorsMessage(validPayrollDatails.error)}`);
}


export async function getSchedulerClockInOut(id: string): Promise<EmployeeSchedule> {
    if (!id) throw new Error("Employee ID is required!");

    const respose = await fetch(`${BASE_URL}/api/employees/schedule/${id}`);
    const data = await respose.json();
    
    const validEmployeeSchedule = EmployeeSchedulerSchema.safeParse(data);
    console.log(validEmployeeSchedule.success, validEmployeeSchedule.error, validEmployeeSchedule.data);
    
    if (validEmployeeSchedule.success) {
        return validEmployeeSchedule.data
    } else {
        throw new Error(`Error to get employee ${id}: ${getErrorsMessage(validEmployeeSchedule.error)}`); 
    };
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
        throw new Error(getErrorsMessage(error));
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
    // await new Promise(resolve => (
    //     setTimeout(resolve, 400)
    // ));

    // API_DB.payrolls.push(payroll)
    // API_DB.lastPayroll = API_DB.payrolls[API_DB.payrolls.length - 1]
    // return payroll;
}

export async function deletePayroll (id: string) {
    // await new Promise(resolve => (
    //     setTimeout(resolve, 400)
    // ));

    // if (API_DB.payrolls.length === 0) return;
    // const index = API_DB.payrolls.findIndex(p => p.id === id);
    // const removedPayroll = API_DB.payrolls.splice(index, 1);
    // return removedPayroll;
}
