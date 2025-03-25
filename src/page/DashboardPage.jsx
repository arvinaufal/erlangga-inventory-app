import { useState, useEffect } from "react"; 
import Sidebar from "../components/fragments/Sidebar";
import axios from "axios";
import { TbReportAnalytics } from "react-icons/tb";
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function DashboardPage() {
    const [dataReport, setDataReport] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getReport = async () => {
        setIsLoading(true);
        const endpoint = `http://127.0.0.1:8000/api/report?search=&perPage=all&page=`;

        try {
            const response = await axios.get(endpoint, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    Authorization: `Bearer ` + localStorage.getItem('access_token')
                }
            });

            setDataReport(response.data.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getReport();
    }, []);

    // Prepare chart data
    const chartData = {
        labels: dataReport.map(item => item.product_name),
        datasets: [
            {
                label: 'Net Profit (Rp)',
                data: dataReport.map(item => item.nett_profit),
                backgroundColor: '#084ca4',
                borderColor: '#084ca4',
                borderWidth: 1,
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Product Net Profit Comparison',
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return `Rp ${context.raw.toLocaleString()}`;
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function(value) {
                        return `Rp ${value.toLocaleString()}`;
                    }
                }
            }
        }
    };

    const LoadingSpinner = () => (
        <div className="flex flex-col justify-center items-center content-center h-full gap-20">
            <span className="loading loading-spinner text-primary w-36"></span>
            <div className="flex justify-center items-center content-center">
                <span>Mohon tunggu...</span>
            </div>
        </div>
    );

    return (
        <section className="w-full flex flex-row min-h-screen">
            <Sidebar />
            <div className="flex flex-col w-5/6 bg-slate-100 px-6 py-4 gap-4">
                <div className="flex flex-row w-full rounded-xl shadow-xl bg-white px-4 py-4">
                    <div className="flex w-1/2 items-center content-center gap-4 flex-row">
                        <TbReportAnalytics size={40} className={`text-[#084ca4]`} />
                        <span className="text-xl font-semibold text-[#084ca4]">Dashboard</span>
                    </div>
                    <div className="flex flex-row w-1/2 px-4 justify-end">
                        <div className="breadcrumbs text-md">
                            <ul>
                                <li>
                                    <a>
                                        <TbReportAnalytics size={20} className={`text-[#084ca4]`} />
                                        <span className="text-[#084ca4]">
                                            Dashboard
                                        </span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <div className="flex flex-col w-full h-full bg-white px-8 py-4 rounded-xl shadow-xl justify-center items-center content-center">
                    {isLoading ? (
                        <LoadingSpinner />
                    ) : (
                        <div className="flex flex-col w-full rounded-xl overflow-hidden">
                            <div className="h-96 w-full">
                                <Bar data={chartData} options={chartOptions} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}