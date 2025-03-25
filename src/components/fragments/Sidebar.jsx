import { FaBoxArchive, FaBoxesStacked, FaCartShopping, FaDatabase, FaUserGroup } from "react-icons/fa6";
import { MdCategory, MdDashboard } from "react-icons/md";
import { Link } from "react-router-dom";
import useSidebarStore from "../../stores/SidebarStore";
import { TbReportAnalytics } from "react-icons/tb";

export default function Sidebar() {
    const { currentMenu, updateCurrentMenu } = useSidebarStore();

    return (
        <div className="flex flex-col w-1/6 bg-white border-r border-r-slate-100 shadow-xl px-4">
            {/* Logo dan Judul */}
            <div className="flex flex-col w-full justify-center items-center content-center py-4">
                <div className="w-35">
                    <img src="https://www.erlangga.co.id/images/logo-erlangga-png-resources-blue.png" alt="" />
                </div>
                <div className="flex w-full justify-center items-center content-center py-2">
                    <span className="italic font-bold text-[#084ca4]">Erlangga Inventory</span>
                </div>
            </div>

            {/* Menu Items */}
            <div className="w-full flex flex-col gap-4">
                {/* Dashboard */}
                <div className="w-full flex">
                    <Link
                        to={"/"}
                        className={`w-full flex flex-row justify-center hover:bg-[#084ca4] py-2 px-3 rounded-full group transition-colors duration-500 cursor-pointer ${currentMenu === 'dashboard' ? 'bg-[#084ca4]' : ''}`}
                        onClick={() => updateCurrentMenu('dashboard')} // Update state saat diklik
                    >
                        <div className="flex w-1/5 justify-center">
                            <MdDashboard size={24} className={`text-[#084ca4] group-hover:text-white ${currentMenu === 'dashboard' ? 'text-white' : ''}`} />
                        </div>
                        <div className={`flex w-4/5 items-center text-md text-[#084ca4] group-hover:text-white ${currentMenu === 'dashboard' ? 'text-white' : ''}`}>
                            Dashboard
                        </div>
                    </Link>
                </div>

                {/* Penjualan */}
                <div className="w-full flex">
                    <Link
                        to={"/sales"}
                        className={`w-full flex flex-row justify-center hover:bg-[#084ca4] py-2 px-3 rounded-full group transition-colors duration-500 cursor-pointer ${currentMenu === 'sales' ? 'bg-[#084ca4]' : ''}`}
                        onClick={() => updateCurrentMenu('sales')} // Update state saat diklik
                    >
                        <div className="flex w-1/5 justify-center">
                            <FaCartShopping size={20} className={`text-[#084ca4] group-hover:text-white ${currentMenu === 'sales' ? 'text-white' : ''}`} />
                        </div>
                        <div className={`flex w-4/5 items-center text-md text-[#084ca4] group-hover:text-white ${currentMenu === 'sales' ? 'text-white' : ''}`}>
                            Sales
                        </div>
                    </Link>
                </div>

                {/* Stok Barang */}
                <div className="w-full flex">
                    <Link
                        to={"/inventory"}
                        className={`w-full flex flex-row justify-center hover:bg-[#084ca4] py-2 px-3 rounded-full group transition-colors duration-500 cursor-pointer ${currentMenu === 'inventory' ? 'bg-[#084ca4]' : ''}`}
                        onClick={() => updateCurrentMenu('inventory')} // Update state saat diklik
                    >
                        <div className="flex w-1/5 justify-center">
                            <FaBoxesStacked size={20} className={`text-[#084ca4] group-hover:text-white ${currentMenu === 'inventory' ? 'text-white' : ''}`} />
                        </div>
                        <div className={`flex w-4/5 items-center text-md text-[#084ca4] group-hover:text-white ${currentMenu === 'inventory' ? 'text-white' : ''}`}>
                            Product Stock
                        </div>
                    </Link>
                </div>

                {/* Laporan */}
                <div className="w-full flex">
                    <Link
                        to={"/report"}
                        className={`w-full flex flex-row justify-center hover:bg-[#084ca4] py-2 px-3 rounded-full group transition-colors duration-500 cursor-pointer ${currentMenu === 'report' ? 'bg-[#084ca4]' : ''}`}
                        onClick={() => updateCurrentMenu('report')} // Update state saat diklik
                    >
                        <div className="flex w-1/5 justify-center">
                            <TbReportAnalytics size={20} className={`text-[#084ca4] group-hover:text-white ${currentMenu === 'report' ? 'text-white' : ''}`} />
                        </div>
                        <div className={`flex w-4/5 items-center text-md text-[#084ca4] group-hover:text-white ${currentMenu === 'report' ? 'text-white' : ''}`}>
                            Report
                        </div>
                    </Link>
                </div>

                {/* Data Master dengan Submenu */}
                <div className="w-full flex flex-col">
                    <div className="collapse collapse-arrow text-[#084ca4]">
                        <input
                            type="checkbox"
                            className="peer"
                            checked={
                                currentMenu === "master/goods" ||
                                    currentMenu === "master/users" ||
                                    currentMenu === "master/categories" ? true : null
                            }
                            onChange={() => { }}
                        />
                        {/* Header Data Master */}
                        <div className="collapse-title w-full flex flex-row justify-center content-center items-center gap-2 hover:bg-[#084ca4] py-2 px-3 rounded-full group transition-colors duration-500 cursor-pointer">
                            <div className="flex w-1/5 justify-center">
                                <FaDatabase size={20} className="text-[#084ca4] group-hover:text-white" />
                            </div>
                            <div className="flex w-4/5 items-center text-md text-[#084ca4] group-hover:text-white">
                                Master Data
                            </div>
                        </div>

                        {/* Submenu */}
                        <div className="collapse-content">
                            {/* Master Barang */}
                            <Link
                                to={"/master/goods"}
                                className={`w-full mt-2 gap-2 flex flex-row justify-center hover:bg-[#084ca4] py-2 px-3 rounded-full group transition-colors duration-500 cursor-pointer ${currentMenu === 'master/goods' ? 'bg-[#084ca4]' : ''}`}
                                onClick={() => updateCurrentMenu('master/goods')} // Update state saat diklik
                            >
                                <div className="flex w-1/5 justify-center">
                                    <FaBoxArchive size={20} className={`text-[#084ca4] group-hover:text-white ${currentMenu === 'master/goods' ? 'text-white' : ''}`} />
                                </div>
                                <div className={`flex w-4/5 items-center text-md text-[#084ca4] group-hover:text-white ${currentMenu === 'master/goods' ? 'text-white' : ''}`}>
                                    Product
                                </div>
                            </Link>

                            {/* Master User */}
                            <Link
                                to={"/master/users"}
                                className={`w-full mt-2 gap-2 flex flex-row justify-center hover:bg-[#084ca4] py-2 px-3 rounded-full group transition-colors duration-500 cursor-pointer ${currentMenu === 'master/users' ? 'bg-[#084ca4]' : ''}`}
                                onClick={() => updateCurrentMenu('master/users')} // Update state saat diklik
                            >
                                <div className="flex w-1/5 justify-center">
                                    <FaUserGroup size={20} className={`text-[#084ca4] group-hover:text-white ${currentMenu === 'master/users' ? 'text-white' : ''}`} />
                                </div>
                                <div className={`flex w-4/5 items-center text-md text-[#084ca4] group-hover:text-white ${currentMenu === 'master/users' ? 'text-white' : ''}`}>
                                    User
                                </div>
                            </Link>

                            {/* Master Kategori */}
                            <Link
                                to={"/master/categories"}
                                className={`w-full mt-2 gap-2 flex flex-row justify-center hover:bg-[#084ca4] py-2 px-3 rounded-full group transition-colors duration-500 cursor-pointer ${currentMenu === 'master/categories' ? 'bg-[#084ca4]' : ''}`}
                                onClick={() => updateCurrentMenu('master/categories')} // Update state saat diklik
                            >
                                <div className="flex w-1/5 justify-center">
                                    <MdCategory size={20} className={`text-[#084ca4] group-hover:text-white ${currentMenu === 'master/categories' ? 'text-white' : ''}`} />
                                </div>
                                <div className={`flex w-4/5 items-center text-md text-[#084ca4] group-hover:text-white ${currentMenu === 'master/categories' ? 'text-white' : ''}`}>
                                    Category
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}