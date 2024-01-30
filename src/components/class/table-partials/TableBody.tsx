import { ClassDetails } from "@/util/types/Entity.type";
import { Row, TableBodyPropGetter } from "react-table";

interface TableBodyProps {
	rows: Row<ClassDetails>[];
	isSmallScreen: boolean;
	getTableBodyProps: (
		propGetter?: TableBodyPropGetter<ClassDetails>
	) => React.HTMLAttributes<HTMLTableSectionElement>;
	prepareRow: (row: Row<ClassDetails>) => void;
}

export function TableBody({
	rows,
	isSmallScreen,
	getTableBodyProps,
	prepareRow,
}: TableBodyProps) {
	return (
		<tbody className="" {...getTableBodyProps}>
			{rows.map((row) => {
				prepareRow(row);
				return (
					<tr
						className={`text-lg lg:text-xl even:bg-gray-100`}
						{...row.getRowProps()}
						key={row.id}
					>
						{row.cells.map((cell) => {
							return (
								<td
									className={`text-center py-4 text-gray-500 ${(cell.column.id === "from" || cell.column.id === "to") &&
										isSmallScreen
										? "hidden"
										: "table-cell"
										}`}
									{...cell.getCellProps()}
									key={cell.value}
								>
									{cell.render("Cell")}
								</td>
							);
						})}
					</tr>
				);
			})}
		</tbody>
	);
}
