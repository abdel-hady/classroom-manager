import { TeacherDetails } from "@/util/types/Reports.type";
import { Row, TableBodyPropGetter } from "react-table";

interface TableBodyProps {
    rows: Row<TeacherDetails>[];
    isSmallScreen: boolean;
    getTableBodyProps: (
        propGetter?: TableBodyPropGetter<TeacherDetails>
    ) => React.HTMLAttributes<HTMLTableSectionElement>;
    prepareRow: (row: Row<TeacherDetails>) => void;
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
