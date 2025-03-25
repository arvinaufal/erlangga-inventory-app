import { useState, useEffect, useRef } from "react"; // Import useState dan useEffect
import { MdAdd } from "react-icons/md";
import Sidebar from "../components/fragments/Sidebar";
import { FaBoxesStacked, FaMagnifyingGlass } from "react-icons/fa6";
import DataTable from "react-data-table-component";
import axios from "axios";
import FormMasterStock from "../components/auth/formMasterStock";

export default function StokBarangPage() {
    const [dataProduct, setDataProduct] = useState([]);
    const [dataSelectListProduct, setDataSelectListProduct] = useState([]);
    const [datatableOptions, setDatatableOptions] = useState({ searchKeyword: '', perPage: 10, page: 1, totalRows: 0 });
    const [isLoading, setIsLoading] = useState(false);
    const searchTimerRef = useRef(null);

    const getProduct = async () => {
        setIsLoading(true);
        const { searchKeyword, perPage, page } = datatableOptions;
        const endpoint = `http://127.0.0.1:8000/api/products?search=${searchKeyword}&perPage=${perPage}&page=${page}`;

        try {
            const response = await axios.get(endpoint, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    Authorization: `Bearer ` + localStorage.getItem('access_token')
                }
            });

            setDataProduct(response.data.data);
            setDatatableOptions(prev => ({ ...prev, totalRows: response.data.total }));
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const getSelectListProduct = async () => {

        const endpoint = `http://127.0.0.1:8000/api/products?perPage=all`;

        try {
            const response = await axios.get(endpoint, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    Authorization: `Bearer ` + localStorage.getItem('access_token')
                }
            });

            setDataSelectListProduct(response.data.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };


    const addStock = async (formData) => {

        try {
            const productId = formData.get('id');
            const response = await axios.post(
                `http://127.0.0.1:8000/api/products/${productId}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Accept": "application/json",
                        Authorization: `Bearer ` + localStorage.getItem('access_token')
                    }
                }
            );

            if (response.status === 200) {
                getProduct();
                document.getElementById('modal-update').close();
                return response.data;

            }

        } catch (error) {
            console.error("Registration failed:", error.response?.data || error.message);
            document.getElementById('modal-update').close();
            return error.response?.data;
        }
    };

    useEffect(() => {
        if (searchTimerRef.current) {
            clearTimeout(searchTimerRef.current);
        }

        searchTimerRef.current = setTimeout(() => {
            getProduct();
        }, 500);

        return () => {
            if (searchTimerRef.current) {
                clearTimeout(searchTimerRef.current);
            }
        };
    }, [datatableOptions.searchKeyword, datatableOptions.perPage, datatableOptions.page]);

    useEffect(() => {
        getSelectListProduct();
    }, [])

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
            name: 'Photo',
            cell: row => (
                row.photo_path ?
                    <img
                        src={`http://127.0.0.1:8000/product_photos/${row.photo_path.split('/').pop()}`}
                        alt={row.name}
                        style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                    /> :
                    <div style={{ width: '100px', height: '100px', backgroundColor: '#f0f0f0' }}></div>
            ),
            sortable: false,
            width: '100px',
        },
        {
            name: 'Product Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Code',
            selector: row => row.code,
            sortable: true,
        },
        {
            name: 'Stock',
            selector: row => row.stock,
            sortable: true,
        }
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
                        <FaBoxesStacked size={40} className={`text-[#084ca4]`} />
                        <span className="text-xl font-semibold text-[#084ca4]">Product Stock</span>
                    </div>
                    <div className="flex flex-row w-1/2 px-4 justify-end">
                        <div className="breadcrumbs text-md">
                            <ul>
                                <li>
                                    <a>
                                        <FaBoxesStacked size={20} className={`text-[#084ca4]`} />
                                        <span className="text-[#084ca4]">
                                            Product Stock
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
                            <div
                                className="hover:bg-white hover:text-[#084ca4] hover:border-2 hover:border-[#084ca4] bg-[#084ca4] cursor-pointer text-white py-2 px-6 flex items-center gap-2 rounded-full transition-colors duration-500"
                                onClick={() => document.getElementById('modal-update').showModal()}
                            >
                                <MdAdd size={20} />
                                <span>Add Stock</span>
                            </div>
                        </div>

                    </div>


                    <div className="flex flex-col w-full rounded-xl overflow-hidden">
                        <DataTable
                            columns={columns}
                            data={dataProduct}
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


            <dialog id="modal-update" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Add Stock</h3>
                    <div className="modal-action">
                        <div className="flex flex-col w-full">
                            <FormMasterStock addMethod={addStock} dataSelectListProduct={dataSelectListProduct} />
                        </div>
                    </div>
                </div>
            </dialog>

        </section>
    );
}