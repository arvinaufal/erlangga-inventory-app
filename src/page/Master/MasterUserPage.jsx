import Sidebar from "../../components/fragments/Sidebar";

export default function MasterUserPage() {
    return (
        <section className="w-screen flex flex-row min-h-screen">
            <Sidebar />
            <div className="flex w-5/6 bg-slate-300">
                Halaman User
            </div>
        </section>
    );
}