import { Payroll } from "@/types/payroll"
import { getPaymentHistory } from "../../utils/request"
import { useQuery } from "@tanstack/react-query"

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function MiniGraph ({userId}: {userId: string}) {
  const { data: payrolls, isPending, isError } = useQuery<Payroll[]>({
    queryKey: ['payments', {id: userId}],
    queryFn: () => getPaymentHistory(userId)
  })

  const labels = payrolls?.map(p => p.referencePeriod.toLocaleDateString())
  const data = {
    labels: labels,
    datasets: [{
      label: 'Net Salary',
      data: payrolls?.map(p => p.netSalary),
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    },
    {
      label: 'Gross Salary',
      data: payrolls?.map(p => p.grossSalary),
      fill: false,
      borderColor: 'rgb(0, 255, 76)',
      tension: 0.1
    },
    {
      label: 'Total deductions',
      data: payrolls?.map(p => p.deductions.reduce((acc, i) => acc + i.value, 0)),
      fill: false,
      borderColor: 'rgb(241, 85, 24)',
      tension: 0.1
    }]
  };

  return <>
    {isPending ? '...Loading' : (
      <div>
        <Line data={data} options={{
          plugins: {
            title: {
              display: true,
              text: 'Historico de pagamentos'
            },
          }
        }} />
      </div>
      
    )}
  </>
}