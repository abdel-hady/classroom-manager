'use client'
import React from "react";
import Image from "next/image";

const TopBar: React.FC = () => {
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
		</>
	);
};

export default TopBar;
