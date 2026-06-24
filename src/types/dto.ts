import z from "zod";
import { PayrollItem, PayrollItemSchema, PayrollItemTypeSchema, PayrollPeriod, PayrollPeriodSchema, PayrollStatus, PayrollStatusSchema } from "./payroll";
import { schedulerSchema } from "./employee";

export const UserLoginSchema = z.object({
    email: z.string().nonempty('E-mail is required!').email('Invalid e-mail format'),
    cpf: z.string().nonempty('CPF is required!')
})

export const EmployeeSchedulerSchema = z.object({
    id: z.string().nonempty(),
    name: z.string().nonempty(),
    position: z.string(),
    schedules: schedulerSchema
});



export type EmployeeSchedule = z.infer<typeof EmployeeSchedulerSchema>;

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

export const PayrollDetailsReponseSchema = z.object({
    id: z.string().nonempty("Id can not be empty!"),
    employeeId: z.string().nonempty("Employee id can not be empty!"),
    employeeName: z.string(),
    departmentName: z.string(),
    positionName: z.string(),
    period: PayrollPeriodSchema,
    items: z.array(PayrollItemSchema),
    grossAmount: z.number(),
    totalEarnings: z.number(),
    totalDeductions: z.number(),
    netAmount: z.number(),
    status: PayrollStatusSchema,
    generatedAt: z.coerce.date(),
    paymentDate: z.coerce.date().optional()
})

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