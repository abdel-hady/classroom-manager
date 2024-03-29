'use client'
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ClassDetails } from "@/util/types/Entity.type";

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
			<div className="text-3xl text-secondaryColor">
				{/* Welcome <span></span> */}
			</div>
			<div className="flex flex-col md:flex-row gap-3 sm:gap-5">
				{navLinks.map(link => {
					const isActive = pathname.startsWith(link.href)

					return (
						<Link href={link.href} key={link.name} className={isActive ? "p-3 rounded-lg text-2xl bg-primaryColor transform transition-all duration-500 ease-in-out scale-95 sm:scale-100" : "p-3 rounded-lg text-2xl hover:bg-primaryColor"}>
							{link.name}
						</Link>)
				})}
			</div>
		</div>
	);
};
