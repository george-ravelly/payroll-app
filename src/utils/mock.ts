import { Employee } from "@/types/employee";
import { Payroll } from "@/types/payroll";

export const mockEmployee: Employee = {
    id: 'emp-001',
    name: 'George Ribeiro',
    email: 'george.ribeiro@empresa.com',
    cpf: '123.456.789-00',
    phone: '(84) 99999-9999',
    position: 'Desenvolvedor Full Stack',
    departmentName: 'Tecnologia da Informação',
    hireDate: new Date('2023-03-15'),
    active: true
};

export const mockPayroll: Payroll = {
    id: 'pay-2026-06-001',

    employee: mockEmployee,

    period: {
        month: 6,
        year: 2026
    },

    items: [
        {
            id: 'item-001',
            description: 'Salário Base',
            amount: 5000.00,
            type: 'EARNING'
        },
        {
            id: 'item-002',
            description: 'Adicional de Produtividade',
            amount: 500.00,
            type: 'EARNING'
        },
        {
            id: 'item-003',
            description: 'INSS',
            amount: 550.00,
            type: 'DEDUCTION'
        },
        {
            id: 'item-004',
            description: 'Vale Transporte',
            amount: 120.00,
            type: 'DEDUCTION'
        },
        {
            id: 'item-005',
            description: 'Plano de Saúde',
            amount: 180.00,
            type: 'DEDUCTION'
        }
    ],

    grossAmount: 5500.00,

    totalEarnings: 5500.00,

    totalDeductions: 850.00,

    netAmount: 4650.00,

    status: 'PAID',

    generatedAt: new Date('2026-06-30T18:00:00'),

    paymentDate: new Date('2026-07-05T08:00:00')
};

export const mockPayrolls: Payroll[] = [
    mockPayroll,
    {
        ...mockPayroll,
        id: 'pay-2026-05-001',
        period: {
            month: 5,
            year: 2026
        },
        netAmount: 4580,
        generatedAt: new Date('2026-05-31'),
        paymentDate: new Date('2026-06-05')
    },

    {
        ...mockPayroll,
        id: 'pay-2026-04-001',
        period: {
            month: 4,
            year: 2026
        },
        netAmount: 4520,
        generatedAt: new Date('2026-04-30'),
        paymentDate: new Date('2026-05-05')
    }
];

export const employeeDashboardMock = {
    employee: mockEmployee,

    latestPayroll: mockPayroll,

    payrollHistory: mockPayrolls,

    upcomingPaymentDate: new Date('2026-08-05'),

    notifications: [
        {
            id: '1',
            title: 'Novo holerite disponível',
            createdAt: new Date('2026-07-05')
        },
        {
            id: '2',
            title: 'Atualize seus dados cadastrais',
            createdAt: new Date('2026-07-01')
        }
    ]
};
