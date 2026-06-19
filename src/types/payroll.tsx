import { Employee } from "./employee";

export type Payroll = {
    id: string;
    employee: Employee;
    referencePeriod: Date;
    grossSalary: number;
    totalDeductions: number;
    netSalary: number;
    status: 'PENDING' | 'PAID' | 'CANCELLED'; // PENDING, PAID, CANCELLED;
    earnings: PayrollItem[];
    deductions: PayrollItem[]
}

type PayrollItem = {
    // private String description;
    // private BigDecimal value;
    // private ItemType type; // ENTRY ou DEDUCTION
    description: string;
    value: number;
    type: 'ENTRY' | 'DEDUCTION'
}


export type Paycheck = Omit<Payroll, "employee"> & {
    employeeName: string;
    employeeId: string;
    departmentName: string;
    postion: string
};
