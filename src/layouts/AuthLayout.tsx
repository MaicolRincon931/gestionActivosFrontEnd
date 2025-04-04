import Logo from "@/components/logo";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export default function AuthLayout() {
    return (
        <>
            <div className="bg-gray-900 min-h-screen">
                <div className="py-20 lg:py-20 mx-auto w-[450px]">
                    <div className="">
                        <Logo />
                        
                    </div>
                   
                    <div className="mt-10">
                        <Outlet />
                    </div>
                </div>
            </div>

            <ToastContainer
            pauseOnHover={false}
            pauseOnFocusLoss={false}
        />

        </>
    )
}