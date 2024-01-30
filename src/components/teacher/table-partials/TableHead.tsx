import { HeaderGroup, TableSortByToggleProps } from "react-table";
import { RxCaretSort } from "react-icons/rx"
import { TeacherDetails } from "@/util/types/Entity.type";
interface TableHeadProps {
    headerGroups: HeaderGroup<TeacherDetails>[];
}
interface CustomRow<T extends object> extends HeaderGroup<T> {
    getSortByToggleProps: () => TableSortByToggleProps;
    isSorted: () => boolean;
    isSortedDesc: () => boolean;
}
export function TableHead({ headerGroups }: TableHeadProps) {
    return (
        <thead className="">
            {headerGroups.map((headerGroup) => (
                <tr className="" {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                    {headerGroup.headers.map((column) => (
                        <th
                            className={`px-1 py-2 lg:p-4 bg-primaryColor ${column.id === "name" ? "rounded-tl-lg rounded-bl-lg" : ""
                                }${column.id === "Actions" ? "rounded-tr-lg rounded-br-lg" : ""}`}
                            {...column.getHeaderProps(
                                column.id === "Actions"
                                    ? {}
                                    : (column as CustomRow<TeacherDetails>).getSortByToggleProps()
                            )}
                            key={column.id}
                            style={{
                                display:
                                    (column.id === "from" || column.id === "to")
                                        ? "none"
                                        : "table-cell",
                            }}
                        >
                            <div className="flex text-lg lg:text-xl items-center justify-center gap-0 lg:gap-2 text-white">
                                {column.render("Header")}
                                {column.id !== "Actions" && column.id !== "selection" && (
                                    <div className="cursor-pointer">
                                        {(column as CustomRow<TeacherDetails>).isSorted ? (
                                            (column as CustomRow<TeacherDetails>).isSortedDesc ? (
                                                <RxCaretSort className="text-red-500" />
                                            ) : (
                                                <RxCaretSort className="text-green-500" />
                                            )
                                        ) : (
                                            <RxCaretSort className="text-white" />
                                        )}
                                    </div>
                                )}
                            </div>
                        </th>
                    ))}
                </tr>
            ))}
        </thead>
    );
}
