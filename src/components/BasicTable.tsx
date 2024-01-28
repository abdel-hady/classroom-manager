import {
	useTable,
	Column,
	useSortBy,
	useRowSelect,
	useFilters,
	TableInstance,
	Row,
	TableToggleAllRowsSelectedProps,
	TableToggleRowsSelectedProps,
} from "react-table";
import { Checkbox } from "./Checkbox";
import { useEffect } from "react";
import { TableBody } from "./table-partials/TableBody";
import { TableHead } from "./table-partials/TableHead";
import { ClassDetails } from "@/util/types/Reports.type";
import NoData from "./fail/NoData";
import { useWindowResize } from "./hooks/useWindowResize";

interface TableProps {
	data: ClassDetails[];
	columns: Column<ClassDetails>[];
	// onSelectedRowsChange: (selectedRows: ClassDetails[]) => void;
}
interface TableInstanceWithSelection<T extends object>
	extends TableInstance<T> {
	selectedFlatRows: Row<T>[];
	getToggleAllRowsSelectedProps: () => TableToggleAllRowsSelectedProps;
}
interface CustomRow<T extends object> extends Row<T> {
	getToggleRowSelectedProps: () => TableToggleRowsSelectedProps;
}
export function BasicTable({
	data,
	columns,
	// onSelectedRowsChange,
}: TableProps) {
	const isSmallScreen = useWindowResize();
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
		selectedFlatRows,
		getToggleAllRowsSelectedProps,
	} = useTable<ClassDetails>(
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
	) as TableInstanceWithSelection<ClassDetails>;

	// called when the selected rows have changed
	// useEffect(() => {
	// 	onSelectedRowsChange(selectedFlatRows.map((row) => row.original));
	// }, [selectedFlatRows.length]);
	return (
		<div className="w-full flex flex-col justify-center items-center">
			<table className="w-full mt-8" {...getTableProps()}>
				<TableHead headerGroups={headerGroups} isSmallScreen={isSmallScreen} />
				<TableBody
					rows={rows}
					isSmallScreen={isSmallScreen}
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
