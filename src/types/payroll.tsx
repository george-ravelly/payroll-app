import { Employee } from "./employee";

export type PayrollStatus =
    | 'DRAFT'
    | 'PENDING'
    | 'PAID'
    | 'CANCELLED';

export type PayrollItemType =
    | 'EARNING'
    | 'DEDUCTION';

export type PayrollPeriod = {
    month: number;
    year: number;
};

export type PayrollItem = {
    id: string;
    description: string;
    amount: number;
    type: PayrollItemType;
};

export type Payroll = {
    id: string;

    employee: Employee;

    period: PayrollPeriod;

    items: PayrollItem[];

    grossAmount: number;
    totalEarnings: number;
    totalDeductions: number;
    netAmount: number;

    status: PayrollStatus;

    generatedAt: Date;
    paymentDate?: Date;
};


export type PayrollSummary = Omit<Payroll, 'employee' | 'items'> & {
    employeeId: string;
    employeeName: string;
    departmentName: string;
    positionName: string;
};