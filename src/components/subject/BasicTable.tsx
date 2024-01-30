import {
	useTable,
	Column,
	useSortBy,
	useFilters,
	TableInstance,
	Row,
	TableToggleAllRowsSelectedProps,
} from "react-table";
import { TableBody } from "./table-partials/TableBody";
import { TableHead } from "./table-partials/TableHead";
import NoData from "../fail/noData";
import { SubjectDetails } from "@/util/types/Entity.type";

interface TableProps {
	data: SubjectDetails[];
	columns: Column<SubjectDetails>[];
}
interface TableInstanceWithSelection<T extends object>
	extends TableInstance<T> {
	selectedFlatRows: Row<T>[];
	getToggleAllRowsSelectedProps: () => TableToggleAllRowsSelectedProps;
}

export function BasicTable({
	data,
	columns,
}: TableProps) {
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
	} = useTable<SubjectDetails>(
		{ columns, data },
		useFilters,
		useSortBy,
		(hooks) => {
			hooks.visibleColumns.push((columns) => {
				return [
					...columns,
				];
			});
		}
	) as TableInstanceWithSelection<SubjectDetails>;
	return (
		<div className="w-full flex flex-col justify-center items-center">
			<table className="w-full mt-8" {...getTableProps()}>
				<TableHead headerGroups={headerGroups} />
				<TableBody
					rows={rows}
					getTableBodyProps={getTableBodyProps}
					prepareRow={prepareRow}
				/>
			</table>
			<hr
				className={`${data.length == 0 ? "block" : "hidden"
					} text-2xl border-t-2 text-gray-500 w-[90%]`}
			/>
			{data.length == 0 && <NoData />}
		</div>
	);
}
