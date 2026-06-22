import z from "zod"

export const EmployeeSchema = z.object({
  id: z.ZodString,
  name: z.ZodString,
  email: z.ZodString,
  cpf: z.ZodString,
  departmentName: z.ZodString,
  phone: z.ZodString,
  active: z.ZodBoolean,
  position: z.ZodString,
  hireDate: z.ZodDate
});

export type Employee = z.infer<typeof EmployeeSchema>;