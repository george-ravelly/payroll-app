import { Attendance, AttendanceStatus, schedulerSchema } from "@/types/employee";
import { PayrollPeriod } from "@/types/payroll";
import z from "zod";

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


export function timeToMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number)

    return hours * 60 + minutes
}

export function dateToMinutes(date: Date): number {
    return date.getHours() * 60 + date.getMinutes()
}

export function getEmployeeAttendanceStatus(
    schedule: z.infer<typeof schedulerSchema>,
    attendance: Attendance,
    toleranceMinutes = 5
): AttendanceStatus {

    const scheduledStart = timeToMinutes(schedule.clockIn)
    let scheduledEnd = timeToMinutes(schedule.clockOut)

    const overnight = scheduledEnd < scheduledStart

    if (overnight) {
        scheduledEnd += 24 * 60
    }

    const now = new Date()

    let currentMinutes =
        now.getHours() * 60 +
        now.getMinutes()

    if (overnight && currentMinutes < scheduledStart) {
        currentMinutes += 24 * 60
    }

    // Ainda não bateu ponto

    if (!attendance.clockIn) {

        if (currentMinutes < scheduledStart) {
            return 'NOT_STARTED'
        }

        return 'LATE'
    }

    // Já registrou entrada

    let actualClockIn = dateToMinutes(attendance.clockIn)

    if (overnight && actualClockIn < scheduledStart) {
        actualClockIn += 24 * 60
    }

    // Já registrou saída

    if (attendance.clockOut) {

        let actualClockOut =
            dateToMinutes(attendance.clockOut)

        if (overnight && actualClockOut < scheduledStart) {
            actualClockOut += 24 * 60
        }

        if (actualClockOut < scheduledEnd) {
            return 'LEFT_EARLY'
        }

        return 'FINISHED'
    }

    // Está trabalhando

    if (currentMinutes > scheduledEnd) {
        return 'OVERTIME'
    }

    if (
        actualClockIn >
        scheduledStart + toleranceMinutes
    ) {
        return 'LATE'
    }

    return 'WORKING'
}