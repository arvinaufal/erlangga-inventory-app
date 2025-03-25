import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function VerifyPage() {
    const [status, setStatus] = useState('verifying');
    // <a href="https://storyset.com/user">User illustrations by Storyset</a>
    const [searchParams] = useSearchParams();
    const data = searchParams.get("data"); 

    useEffect(() => {
        if (data) {
            axios.post("http://127.0.0.1:8000/api/verify", { data })
                .then(response => {
                    setStatus('success')
                })
                .catch(error => {
                    console.error("Verifikasi gagal:", error);
                });
        } else {
            setStatus('failed')
        }
    }, [data]);

    return (
        <section className=" min-h-screen w-screen">
            <div className="flex flex-col w-full h-screen">

                <div className="flex flex-row w-full justify-center my-5 h-10">
                    <a href="https://www.erlangga.co.id/" className="w-40 h-40">
                        <img src="https://www.erlangga.co.id/images/logo-erlangga-png-resources-blue.png" alt="" />
                    </a>
                </div>
                <div className=" flex flex-row w-full h-full px-4">
                    <div className="flex flex-col justify-center content-center items-center w-1/2">
                        <div className="flex flex-col justify-center content-center items-center ml-48">
                            <div className=" ">
                                <img src={"/public/images/verify-cover.png"} alt="People illustrations by Storyset" style={{ width: 350 }} />
                            </div>
                            <div className="flex flex-col w-full items-center justify-center text-center">
                                <div className="">
                                    <span className="text-lg font-bold text-slate-950 italic">Erlangga Inventory</span>
                                </div>
                                <div className="w-5/6 pt-2">
                                    <span className="text-sm font-light">Easiness at its finest. Pengelolaan inventory dengan mengutamakan kemudahan dan efisiensi.</span>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className=" flex flex-col justify-center content-center items-center w-1/2 mb-20">
                        <div className="container w-2/3 h-2/3  flex flex-col justify-center content-center items-center mr-48">
                            <div className="w-5/6 rounded-2xl shadow-lg flex flex-col">
                            
                                    {
                                        status === 'verifying' && (
                                            <div className="pb-16 px-16 pt-6 flex flex-col w-full justify-center items-center content-center">
                                                <div className="w-full mb-14">
                                                    <div className="w-full text-center">
                                                        <span className="font-bold text-xl">Mohon tunggu, ya!</span>
                                                    </div>
                                                    <div className="w-full text-center flex flex-col">
                                                        <span className="text-sm">Saat ini akunmu sedang diverifikasi.</span>
                                                        <span className="text-sm">Mohon tunggu sesaat!</span>
                                                    </div>
                                                    {/* <ClientFlashComponent /> */}
                                                </div>
                                                <span className="loading loading-spinner text-primary w-36"></span>
                                            </div>
                                        )
                                    }
                                    {
                                        status === 'failed' && (
                                            <div className="pb-8 px-8 pt-6 flex flex-col w-full justify-center items-center content-center">
                                                <div className="w-full mb-6">
                                                    <div className="w-full text-center">
                                                        <span className="font-bold text-xl">Verifikasi Gagal!</span>
                                                    </div>
                                                    <div className="w-full text-center flex flex-col">
                                                        <span className="text-sm">Akun tidak ditemukan atau akun telah diverifikasi sebelumnya.</span>
                                                        
                                                    </div>
                                                </div>
                                                <div className="flex flex-col justify-center items-center content-center w-56">
                                                    <DotLottieReact
                                                        src={"/public/lottie/1742762093915.lottie"}
                                                        loop
                                                        autoplay
                                                    />
                                                        
                                                    </div>
                                                <div className="flex mt-8">
                                                    <span className="text-sm">Kembali ke <Link to={'/login'} className="text-[#084ca4] font-semibold">Login</Link></span>
                                                </div>
                                            </div>
                                        )
                                    }
                                    {
                                        status === 'success' && (
                                            <div className="pb-8 px-8 pt-6 flex flex-col w-full justify-center items-center content-center">
                                                <div className="w-full mb-6">
                                                    <div className="w-full text-center">
                                                        <span className="font-bold text-xl">Verifikasi Berhasil!</span>
                                                    </div>
                                                    <div className="w-full text-center flex flex-col">
                                                        <span className="text-sm">Akun telah berhasil diverifikasi.</span>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col justify-center items-center content-center w-56">
                                                    <DotLottieReact
                                                        src={"/public/lottie/1742762151857.lottie"}
                                                        loop
                                                        autoplay
                                                    />
                                                        
                                                    </div>
                                                <div className="flex mt-8">
                                                    <span className="text-sm">Kembali ke <Link to={'/login'} className="text-[#084ca4] font-semibold">Login</Link></span>
                                                </div>
                                            </div>
                                        )
                                    }
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}