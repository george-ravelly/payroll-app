import z from "zod";
import { PayrollItem, PayrollPeriod, PayrollStatus } from "./payroll";

export const UserLoginSchema = z.object({
    email: z.string().nonempty('E-mail is required!').email('Invalid e-mail format'),
    cpf: z.string().nonempty('CPF is required!')
})

export type UserLogin = z.infer<typeof UserLoginSchema>

export type CreatePayrollRequest = {
    employeeId: string;

    period: PayrollPeriod;

    items: Omit<PayrollItem, 'id'>[];
};

export type UpdatePayrollRequest = {
    items?: Omit<PayrollItem, 'id'>[];

    status?: PayrollStatus;

    paymentDate?: Date;
};


export type PayrollListItemResponse = {
    id: string;

    employeeId: string;
    employeeName: string;

    departmentName: string;
    positionName: string;

    period: PayrollPeriod;

    grossAmount: number;
    netAmount: number;

    status: PayrollStatus;

    paymentDate?: Date;
};

export type PayrollDetailsResponse = {
    id: string;

    employeeId: string;
    employeeName: string;

    departmentName: string;
    positionName: string;

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

export type PayrollSummaryResponse = {
    totalPayrolls: number;

    pendingPayrolls: number;

    paidPayrolls: number;

    cancelledPayrolls: number;

    totalGrossAmount: number;

    totalNetAmount: number;
};

export type PayrollPaymentResponse = {
    payrollId: string;

    employeeId: string;

    employeeName: string;

    amount: number;

    status:
        | 'PENDING'
        | 'PROCESSING'
        | 'PAID'
        | 'FAILED';

    paymentMethod:
        | 'PIX'
        | 'BANK_TRANSFER';

    paymentDate?: Date;

    transactionId?: string;
};

export type ProcessPayrollPaymentRequest = {
    payrollId: string;

    paymentMethod:
        | 'PIX'
        | 'BANK_TRANSFER';
};