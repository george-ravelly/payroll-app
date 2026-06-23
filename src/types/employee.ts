import z from "zod"

export const EmployeeSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.email(),
  cpf: z.string(),
  departmentName: z.string(),
  phone: z.string(),
  active: z.boolean(),
  position: z.string(),
  hireDate: z.coerce.date()
});

export type Employee = z.infer<typeof EmployeeSchema>;