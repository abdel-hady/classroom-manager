'use client'
import React from "react";
import { IoMdAddCircle } from "react-icons/io";
import { MdOutlineDeleteOutline } from "react-icons/md";
import ActionBtn from "./common/ActionBtn";
import { ClassDetails } from "@/util/types/Reports.type";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
	username: string;
	handleDeleteRows: () => void;
	handleAddRows: () => void;
	classDetails: ClassDetails[];
}
const navLinks = [
	{ name: "Classess", href: "/classess" },
	{ name: "Teachers", href: "/teachers" },
	{ name: "Subjects", href: "/subjects" },
]
export default function Tabs() {
	const pathname = usePathname();
	return (
		<div className="flex flex-col lg:flex-row justify-between items-center gap-2">
			<div className="text-3xl text-[#FF7C34]">
				{/* Welcome <span></span> */}
			</div>
			<div className="flex flex-col md:flex-row gap-3 sm:gap-5">
				{navLinks.map(link => {
					const isActive = pathname.startsWith(link.href)

					return (
						<Link href={link.href} key={link.name} className={isActive ? "p-3 rounded-lg text-2xl bg-[#117578] transform transition-all duration-500 ease-in-out scale-95 sm:scale-100" : "p-3 rounded-lg text-2xl hover:bg-[#117578]"}>
							{link.name}
						</Link>)
				})}
			</div>
		</div>
	);
};
