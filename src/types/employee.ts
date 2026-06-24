import z from "zod"

export const schedulerSchema = z.object({
  clockIn: z.string(),
  clockOut: z.string()
})

export const EmployeeSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.email(),
  cpf: z.string(),
  departmentName: z.string(),
  phone: z.string(),
  active: z.boolean(),
  position: z.string(),
  hireDate: z.coerce.date(),
  schedule: schedulerSchema
});

export type Employee = z.infer<typeof EmployeeSchema>;


export type AttendanceStatus =
    | 'NOT_STARTED'
    | 'LATE'
    | 'WORKING'
    | 'LEFT_EARLY'
    | 'FINISHED'
    | 'OVERTIME'

export type Attendance = {
    clockIn?: Date;
    clockOut?: Date;
}