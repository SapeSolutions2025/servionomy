"use client"
import { useState, useEffect } from "react"
import { Bar, Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from "chart.js"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend)

export default function Graficos() {
  const [ventasPorEmpleado, setVentasPorEmpleado] = useState({
    labels: ["Juan", "María", "Pedro", "Ana"],
    datasets: [
      {
        label: "Ventas por Empleado",
        data: [1200, 1900, 3000, 5000],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  })

  const [ventasPorMes, setVentasPorMes] = useState({
    labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
    datasets: [
      {
        label: "Ventas 2023",
        data: [12000, 19000, 3000, 5000, 2000, 3000, 15000, 21000, 18000, 23000, 28000, 30000],
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
      {
        label: "Ventas 2022",
        data: [10000, 15000, 2000, 4000, 1800, 2500, 13000, 19000, 16000, 21000, 25000, 28000],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  })

  const [selectedYear, setSelectedYear] = useState("2023")

  useEffect(() => {
    // Aquí cargaríamos los datos reales desde la API
    // Por ahora, simularemos un cambio en los datos cuando se selecciona un año diferente
    if (selectedYear === "2022") {
      setVentasPorMes((prevState) => ({
        ...prevState,
        datasets: [prevState.datasets[1]],
      }))
    } else {
      setVentasPorMes((prevState) => ({
        ...prevState,
        datasets: [prevState.datasets[0]],
      }))
    }
  }, [selectedYear])

  const optionsBar = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Ventas por Empleado",
      },
    },
  }

  const optionsLine = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Comparativa de Ventas Anuales",
      },
    },
  }

  return (
    <div className="min-h-screen bg-background dark:bg-background-dark">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-foreground dark:text-foreground-dark">Gráficos Comparativos</h1>
        <div className="mb-4">
          <Select onValueChange={setSelectedYear} defaultValue={selectedYear}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Seleccionar año" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-card dark:bg-card-dark p-4 rounded-lg shadow">
            <Bar options={optionsBar} data={ventasPorEmpleado} />
          </div>
          <div className="bg-card dark:bg-card-dark p-4 rounded-lg shadow">
            <Line options={optionsLine} data={ventasPorMes} />
          </div>
        </div>
      </div>
    </div>
  )
}

