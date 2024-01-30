import { SubjectDetails } from "@/util/types/Entity.type";
import { Column } from "react-table";

export const BasicColumns: Column<SubjectDetails>[] = [
	{
		Header: "Subject Name",
		accessor: "name",
	},
	{
		Header: "Agenda",
		accessor: "agenda",
	},
	{
		Header: "Participants",
		accessor: "participants",
	},
];