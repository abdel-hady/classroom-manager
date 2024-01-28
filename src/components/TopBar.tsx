'use client'
import React from "react";
import { LuLogOut } from "react-icons/lu";
import { useAuth } from "@/providers/AuthProvider";
import LocalStorageService from "@/local/LocalStorageService";
import { useRouter } from "next/navigation";
import Image from "next/image";

const TopBar: React.FC = () => {
	const { logout } = useAuth();
	const router = useRouter();
	const { getRememberMe, setRememberMe } =
		LocalStorageService;
	const rememberMe = getRememberMe();
	const handleLogout = () => {
		logout();
		if (rememberMe) setRememberMe(rememberMe);
		router.push("/login");
	};

	return (
		<>
			<div className="absolute top-0 left-0 w-full h-screen bg-gray-500 bg-opacity-50"></div>
			<Image
				src="/system_background.jpg"
				alt="login background"
				width={1000}
				height={1000}
				className="bg-opacity-50  w-full h-screen object-cover"
			/>
			<div className="absolute top-[3%] left-[2%] md:left-[5%]">
				<Image
					src="/mengaji.png"
					alt="logo"
					width={1000}
					height={1000}
					className="w-24 h-24"
				/>
			</div>
			<div className="absolute h-24 flex justify-center items-center top-[3%] right-[2%] md:right-[5%]">
				<div
					onClick={handleLogout}
					className="text-xl sm:text-2xl flex flex-row gap-2 justify-center items-center hover:text-red-500 transform transition-all duration-300 ease-in-out cursor-pointer"
				>
					Logout
					<span>
						<LuLogOut size={24} className="theme-icon hover:scale-110" />
					</span>
				</div>
			</div>
		</>
	);
};

export default TopBar;
