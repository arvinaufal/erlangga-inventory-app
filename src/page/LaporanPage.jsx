import { useState, useEffect, useRef } from "react"; 
import Sidebar from "../components/fragments/Sidebar";
import { FaMagnifyingGlass } from "react-icons/fa6";
import DataTable from "react-data-table-component";
import axios from "axios";
import { TbReportAnalytics } from "react-icons/tb";

export default function LaporanPage() {
    const [dataReport, setDataReport] = useState([]);
    const [datatableOptions, setDatatableOptions] = useState({ searchKeyword: '', perPage: 10, page: 1, totalRows: 0 });
    const [isLoading, setIsLoading] = useState(false);
    const searchTimerRef = useRef(null);
    const [isDownloading, setIsDownloading] = useState(false);


    const getReport = async () => {
        setIsLoading(true);
        const { searchKeyword, perPage, page } = datatableOptions;
        const endpoint = `http://127.0.0.1:8000/api/report?search=${searchKeyword}&perPage=${perPage}&page=${page}`;

        try {
            const response = await axios.get(endpoint, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    Authorization: `Bearer ` + localStorage.getItem('access_token')
                }
            });

            setDataReport(response.data.data);
            setDatatableOptions(prev => ({ ...prev, totalRows: response.data.total }));
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const downloadReport = async (type) => {
        setIsDownloading(true);
        try {
            const { searchKeyword } = datatableOptions;
            const endpoint = `http://127.0.0.1:8000/api/report/export/${type}?search=${searchKeyword}`;
            
            const response = await axios.get(endpoint, {
                responseType: 'blob',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": type === 'excel' 
                        ? "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" 
                        : "application/pdf",
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                }
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;

            const extension = type === 'excel' ? 'xlsx' : 'pdf';
            link.setAttribute('download', `products_report.${extension}`);
            
            document.body.appendChild(link);
            link.click();

            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error downloading report:", error);
        } finally {
            setIsDownloading(false);
        }
    };
    

    useEffect(() => {
        if (searchTimerRef.current) {
            clearTimeout(searchTimerRef.current);
        }

        searchTimerRef.current = setTimeout(() => {
            getReport();
        }, 500);

        return () => {
            if (searchTimerRef.current) {
                clearTimeout(searchTimerRef.current);
            }
        };
    }, [datatableOptions.searchKeyword, datatableOptions.perPage, datatableOptions.page]);

    const handleSearch = (keyword) => {
        setDatatableOptions(prev => ({
            ...prev,
            searchKeyword: keyword,
            page: 1
        }));
    };

    const handlePerPageChange = (newPerPage) => {
        setDatatableOptions(prev => ({ ...prev, perPage: newPerPage, page: 1 }));
    };

    const handlePageChange = (newPage) => {
        setDatatableOptions(prev => ({ ...prev, page: newPage }));
    };

    const LoadingSpinner = () => (
        <div className="flex flex-col justify-center items-center content-center h-full gap-20">
            <span className="loading loading-spinner text-primary  w-36"></span>
            <div className="flex justify-center items-center content-center">
                <span>Mohon tunggu...</span>
            </div>
        </div>
    );

    const NoDataAvailable = () => (
        <div className="flex flex-col justify-center items-center h-full">
            <img src={"/public/images/no-data.png"} alt="Data illustrations by Storyset" style={{ width: 400 }} />
            <span className="text-gray-500 italic">No data available</span>
        </div>
    );


    const columns = [
        {
            name: 'No',
            selector: (row, index) => (datatableOptions.page - 1) * datatableOptions.perPage + index + 1,
            sortable: false, 
            width: '80px',
        },
        {
            name: 'Product Name',
            selector: row => row.product_name,
            sortable: true,
        },
        {
            name: 'Code',
            selector: row => row.product_code,
            sortable: true,
        },
        {
            name: 'Opening Stock',
            selector: row => row.opening_stock,
            sortable: true,
        },
        {
            name: 'Closing Stock',
            selector: row => row.closing_stock,
            sortable: true,
        },
        {
            name: 'Sales Quantity',
            selector: row => row.sales_quantity,
            sortable: true,
        },
        {
            name: "Gross Profit",
            cell: row => {
                let formattedGrossProfit = new Intl.NumberFormat("id-ID", { 
                    style: "currency", 
                    currency: "IDR"
                }).format(row.gross_profit);
            
                return <span>{formattedGrossProfit}</span>;
            },
            sortable: true,
            width: '150px',
        },
        {
            name: "Nett Profit",
            cell: row => {
                let formattedNettProfit = new Intl.NumberFormat("id-ID", { 
                    style: "currency", 
                    currency: "IDR"
                }).format(row.nett_profit);
            
                return <span>{formattedNettProfit}</span>;
            },
            sortable: true,
            width: '150px',
        },
    ];

    const customStyles = {
        rows: {
            style: {
                border: '1px solid #e2e8f0',
            },
        },
        headCells: {
            style: {
                backgroundColor: '#084ca4',
                color: '#ffffff',
                fontWeight: 'bold',
            },
        },
        cells: {
            style: {
                padding: '10px',
            },
        },
    };

    const conditionalRowStyles = [
        {
            when: (row, index) => index % 2 === 0,
            style: {
                backgroundColor: '#bae6fd',
            },
        },
        {
            when: (row, index) => index % 2 !== 0,
            style: {
                backgroundColor: '#ffffff',
            },
        },
    ];

    return (
        <section className="w-full flex flex-row min-h-screen">
            <Sidebar />
            <div className="flex flex-col w-5/6 bg-slate-100 px-6 py-4 gap-4">
                <div className="flex flex-row w-full rounded-xl shadow-xl bg-white px-4 py-4">
                    <div className="flex w-1/2 items-center content-center gap-4 flex-row">
                        <TbReportAnalytics size={40} className={`text-[#084ca4]`} />
                        <span className="text-xl font-semibold text-[#084ca4]">Report</span>
                    </div>
                    <div className="flex flex-row w-1/2 px-4 justify-end">
                        <div className="breadcrumbs text-md">
                            <ul>
                                <li>
                                    <a>
                                        <TbReportAnalytics size={20} className={`text-[#084ca4]`} />
                                        <span className="text-[#084ca4]">
                                            Report
                                        </span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-full h-full bg-white px-8 py-4 rounded-xl shadow-xl">
                    <div className="flex flex-row w-full">
                        <div className='w-1/2 flex flex-col justify-start items-start content-start my-8'>
                            <div className='flex flex-row w-2/3 justify-center relative'>
                                <input
                                    type="text"
                                    value={datatableOptions.searchKeyword}
                                    onChange={(e) => handleSearch(e.target.value)}
                                    placeholder='Cari data...'
                                    className="bg-white focus:outline-none rounded-full  pr-16 pl-4 pt-2 pb-2 border border-solid border-slate-800"
                                    style={{ width: "80%" }}
                                />
                                <div className='w-14 flex justify-center items-center content-center absolute right-9 top-1 rounded-full py-2' >
                                    <FaMagnifyingGlass style={{ color: "#084ca4", fontWeight: "bold" }} size={18} />
                                </div>
                            </div>
                        </div>
                        <div className="flex w-1/2 justify-end items-center content-center">
                            <div className="dropdown dropdown-end ">
                                <div tabIndex={0} role="button" className="btn m-1">Download Report</div>
                                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow-sm">
                                    {isDownloading ? (
                                        <li>
                                            <div className="text-gray-500 cursor-not-allowed">
                                                Downloading...
                                            </div>
                                        </li>
                                    ) : (
                                        <>
                                            <li>
                                                <div 
                                                    onClick={() => downloadReport('excel')}
                                                    className="hover:bg-gray-100 cursor-pointer"
                                                >
                                                    Excel
                                                </div>
                                            </li>
                                            <li>
                                                <div 
                                                    onClick={() => downloadReport('pdf')}
                                                    className="hover:bg-gray-100 cursor-pointer"
                                                >
                                                    PDF
                                                </div>
                                            </li>
                                        </>
                                    )}
                                </ul>
                            </div>
                        </div>

                    </div>


                    <div className="flex flex-col w-full rounded-xl overflow-hidden">
                        <DataTable
                            columns={columns}
                            data={dataReport}
                            customStyles={customStyles}
                            conditionalRowStyles={conditionalRowStyles}
                            pagination
                            paginationServer
                            paginationTotalRows={datatableOptions.totalRows}
                            onChangePage={handlePageChange}
                            onChangeRowsPerPage={handlePerPageChange}
                            progressPending={isLoading} 
                            progressComponent={<LoadingSpinner />}
                            noDataComponent={<NoDataAvailable />} 
                            highlightOnHover
                            striped={false}
                        />
                    </div>
                </div>
            </div>
            

        </section>
    );
}