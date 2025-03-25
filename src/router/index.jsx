import { createBrowserRouter, redirect } from "react-router-dom";
import LoginPage from "../page/LoginPage";
import RegisterPage from "../page/RegisterPage";
import DashboardPage from "../page/DashboardPage";
import PenjualanPage from "../page/PenjualanPage";
import StokBarangPage from "../page/StokBarangPage";
import MasterUserPage from "../page/Master/MasterUserPage";
import MasterBarangPage from "../page/Master/MasterProductPage";
import MasterKategoriPage from "../page/Master/MasterCategoryPage";
import VerifyPage from "../page/VerifyPage";
import LaporanPage from "../page/LaporanPage";
// import { BookCard } from "../components/BookCard";
// import { LoginPage } from "../views/Auth/Login";
// import { RegisterPage } from "../views/Auth/Register";
// import { SideBar } from "../components/Sidebar";
// import { HomePage } from "../views/Books";
// import { GamePage } from "../views/game";
// import { GameCard } from "../components/GameCard";
// import { MyBookPage } from "../views/History";

// const RootLayout = () => {
//     return (
//       <>
//         <SideBar />
//         <Outlet />
//       </>
//     );
//   };
const router = createBrowserRouter([
    {
        loader: () => {
            const isLogin = localStorage.getItem('access_token');
            if (!isLogin || isLogin === '') {
                throw redirect("/login");
            }

            return null;
        },
        path: "/",
        // element: <DashboardPage />,
        children: [
            {
                path: "",
                element: <DashboardPage />,
            },
            {
                path: "sales",
                element: <PenjualanPage />,
            },
            {
                path: "inventory",
                element: <StokBarangPage />,
            },
            {
                path: "report",
                element: <LaporanPage />,
            },
            {
                path: "master",
                // element: <StokBarangPage />,
                children: [
                    {
                        path: "goods",
                        element: <MasterBarangPage />,
                    },
                    {
                        path: "users",
                        element: <MasterUserPage />,
                    },
                    {
                        path: "categories",
                        element: <MasterKategoriPage />,
                    },
                ]
            },
        ],
    },
    {
        // loader: () => {
        //     const isLogin = localStorage.getItem('access_token');
        //     if (isLogin) {
        //         throw redirect("/");
        //     }

        //     return null;
        // },
        path: '/login',
        element: <LoginPage />
    },
    {
        path: '/register',
        element: <RegisterPage />
    },
    {
        path: '/verify',
        element: <VerifyPage />
    }
]);

export default router;