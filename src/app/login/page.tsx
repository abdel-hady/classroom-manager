"use client"
import { useAuth } from "../../providers/AuthProvider";
import LoginForm from "./partials/LoginForm";
import { useState } from "react";
import LocalStorageService from "../../local/LocalStorageServiceClass";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface LoginFormDataTypes {
    name: string;
    rememberMe?: boolean | undefined;
}
export default function Login() {
    const {
        setEmployeeName,
        setRememberMe,
        removeEmployeeName,
        getEmployeeName,
        getRememberMe,
    } = LocalStorageService;
    const { login } = useAuth();
    const router = useRouter();
    const name = getEmployeeName()!;
    const rememberMe = getRememberMe()!;
    const [defaultValues] = useState<LoginFormDataTypes>({
        name,
        rememberMe,
    });
    const handleLoginFormSubmit = (data: LoginFormDataTypes) => {
        const user: string = data.name;
        if (data.rememberMe) {
            setEmployeeName(user);
            setRememberMe(data.rememberMe);
        } else {
            removeEmployeeName();
            setRememberMe(data.rememberMe!);
        }
        const name: string = data.name;

        login(name);
        router.push("/");
    };

    return (
        <div className="relative">
            <Image
                src="/system_background.jpg"
                alt="login background"
                width={1000}
                height={1000}
                className="w-full h-screen object-cover"
            />
            <div className="absolute top-[5%] left-[5%] z-10">
                <Image
                    src="/mengaji.png"
                    alt="logo"
                    width={1000}
                    height={1000}
                    className="w-24 h-24"
                />
            </div>
            <div className="absolute top-20 md:top-20 left-2 w-[96%] md:left-0 md:w-full h-[85%] flex justify-center items-center">
                <div className="flex flex-col justify-center items-center w-[500px] p-12 text-center bg-gray-200 bg-opacity-50 rounded-3xl border-2 border-white h-[80%]">
                    <h1 className="text-4xl text-gray-500 pb-5">Welcome</h1>
                    <h3 className="text-2xl text-gray-400">
                        Please log in to access your account and manage your classes
                    </h3>
                    <LoginForm
                        onSubmit={handleLoginFormSubmit}
                        defaultValues={defaultValues}
                    />
                </div>
            </div>
        </div>
    );
}
