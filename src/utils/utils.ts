import { PayrollPeriod } from "@/types/payroll";

export const getErrorsMessage = (error: unknown): string => {
    let message: string;

    if (error instanceof Error) {
        message = error.message;
    } else if (error && typeof error === 'object' && 'message' in error) {
        message = String(error.message);
    } else if (typeof error === 'string') {
        message = error;
    } else {
        message = "Something went wrong.";
    }

    return message;
}


export function getPeriod(period: PayrollPeriod) {
    return `${period?.month}/${period?.year}`
}

export const formatCurrency = (value: number) => value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
});