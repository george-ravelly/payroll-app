import useSendAndValidData from '@/hooks/updateForm';
import { Employee, EmployeeSchema } from '@/types/employee';
import { createEmployee } from '@/utils/request';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

function EmployeeForm() {
  const {register, handleSubmit} = useForm({
    resolver: zodResolver(EmployeeSchema)
  })

  const { submit } = useSendAndValidData({
    entity: "employees",
    schema: EmployeeSchema,
    mutationFn: createEmployee,
  });

  async function formHandleSubmit(data: Employee) {
    await submit(data);
  }

  return (
    <form onSubmit={handleSubmit(formHandleSubmit)}>
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" type="text" {...register('name')} />
      </div>

      <div>
        <label htmlFor="email">E-mail</label>
        <input id="email" type="email" {...register('email')} required />
      </div>

      <div>
        <label htmlFor="position">Position</label>
        <input id="position" type="text" {...register('position')} />
      </div>

      <div>
        <label htmlFor="department">Department</label>
        <input id="department" type="text" {...register('departmentName')}/>
      </div>

      <div>
        <label htmlFor="salary">Phone</label>
        <input id="salary" type="number" {...register('phone')} />
      </div>

      <div>
        <label htmlFor="startDate">Data de início</label>
        <input id="startDate" type="date" {...register("hireDate", { valueAsDate: true })} />
      </div>

      <button type="submit">Save</button>
    </form>
  );
};

export default EmployeeForm;
