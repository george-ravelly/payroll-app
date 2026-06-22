import { EmployeeSchema } from "./employee";
import z from "zod"

export const PayrollItemTypeSchema = z.enum(['EARNING', 'DEDUCTION']);
export type PayrollItemType = z.infer<typeof PayrollItemTypeSchema>;

export const PayrollPeriodSchema = z.object({
    month: z.number(),
    year: z.number(),
});
export type PayrollPeriod = z.infer<typeof PayrollPeriodSchema>;

export const PayrollItemSchema = z.object({
    id: z.string(),
    description: z.string(),
    amount: z.number(),
    type: PayrollItemTypeSchema,
});
export type PayrollItem = z.infer<typeof PayrollItemSchema>;

export const PayrollStatusSchema = z.enum(['DRAFT', 'PENDING', 'PAID', 'CANCELLED']);
export type PayrollStatus = z.infer<typeof PayrollStatusSchema>;

export const PayrollSchema = z.object({
    id: z.string(),
    employee: EmployeeSchema,
    period: PayrollPeriodSchema,
    items: z.array(PayrollItemSchema),
    grossAmount: z.number(),
    totalEarnings: z.number(),
    totalDeductions: z.number(),
    netAmount: z.number(),
    status: PayrollStatusSchema,
    generatedAt: z.date(),
    paymentDate: z.date().optional(),
});

export type Payroll = z.infer<typeof PayrollSchema>