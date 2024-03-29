import { ClassDetails } from "@/util/types/Entity.type";
import { Column } from "react-table";

export const BasicColumns: Column<ClassDetails>[] = [
	{
		Header: "Class Name",
		accessor: "className",
	},
	{
		Header: "Teacher",
		accessor: "teacher",
	},
	{
		Header: "Subject",
		accessor: "subject",
	},
];
