import { Employee } from "@/types/employee"
import { Payroll, Paycheck } from "@/types/payroll"

const user: Payroll = {
    id: 'payroll-001',
    employee: {
        id: 'emp-001',
        name: 'João Silva',
        active: true,
        baseSalary: 5000.00,
        email: 'joao.silva@empresa.com',
        cpf: '123.456.789-00',
        position: 'Desenvolvedor Full Stack',
        departmentName: 'TI'
    },
    referencePeriod: new Date('2026-06-01'),
    grossSalary: 5000.00,
    totalDeductions: 850.00,
    netSalary: 4150.00,
    status: 'PENDING',
    earnings: [
        {
            description: 'Salário Base',
            value: 5000.00,
            type: 'ENTRY'
        }
    ],
    deductions: [
        {
            description: 'INSS',
            value: 550.00,
            type: 'DEDUCTION'
        },
        {
            description: 'Vale Transporte',
            value: 200.00,
            type: 'DEDUCTION'
        },
        {
            description: 'Plano de Saúde',
            value: 100.00,
            type: 'DEDUCTION'
        }
    ]
}

export const getEmployeePayment = async (id: string): Promise<Paycheck> => {
    await new Promise(resolve => (setTimeout(resolve, 1000)))
    const {employee, ...paychek } = user;
    return {
        ...paychek,
        employeeId: employee.id,
        employeeName: employee.name,
        departmentName: employee.departmentName,
        postion: employee.position
    }
}

export const getAllEmployees = async (): Promise<Employee[]> => {
    await new Promise(resolve => (setTimeout(resolve, 1000)))
    return []
}


export const getPaymentHistory = async (id: string): Promise<Paycheck[]> => {
    await new Promise(resolve => (setTimeout(resolve, 1000)));
    const payrolls: Paycheck[] = [];
    const {employee, ...paychek } = user;
    const userPaycheck = await getEmployeePayment(id);
    let month = userPaycheck.referencePeriod.getMonth();
    let year = userPaycheck.referencePeriod.getFullYear();
    while (payrolls.length <= 20) {
        if (month === 0) {
            month = 11;
            year -= 1;
        } else {
            month -= 1;
        }
        const date = new Date(userPaycheck.referencePeriod.getDay(), month, year);
        date.setFullYear(year)
        date.setMonth(month)
        payrolls.push({
            ...userPaycheck, referencePeriod: date
        })
    }
    
    return payrolls.reverse();
}