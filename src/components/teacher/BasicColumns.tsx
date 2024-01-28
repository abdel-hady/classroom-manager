import { TeacherDetails } from "@/util/types/Reports.type";
import { Column } from "react-table";

export const BasicColumns: Column<TeacherDetails>[] = [
    {
        Header: "Teacher Name",
        accessor: "teacherName",
    },
    {
        Header: "major",
        accessor: "major",
    },
    {
        Header: "experience",
        accessor: "experience",
    },
];