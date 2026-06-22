import { Employee } from "@/types/employee"
import Financial from "./Financial"
import HumanResources from "./HumanResources"
import HelpComponent from "../HelpComponent"
import { EmployeeProps } from "@/types/props"
import QuickActions from "./QuickActions"


export default function EmployeeHome({employee}: EmployeeProps) {
  return (
    <main className="m-5">
      <QuickActions />
      {/* 
        Ver Holerites
        Histórico de Pagamentos
        Informe de Rendimentos
      */}
      <Financial employee={employee}/>
      {/* 
        Registrar Ponto
        Solicitar Férias
        Atualizar Dados
      */}
      <HumanResources employee={employee} />
      {/* 
        Abrir Chamado
        Falar com RH
      */}
      <HelpComponent employee={employee} />
    </main>
  )
}