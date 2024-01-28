import { TeacherDetails } from "@/util/types/Reports.type";
import React from "react";
import { IoMdAddCircle } from "react-icons/io";
import { MdOutlineDeleteOutline } from "react-icons/md";
import ActionBtn from "../common/ActionBtn";

interface Props {
    handleAddRows: () => void;
    reportData: TeacherDetails[];
}

const ReportsTableActions: React.FC<Props> = ({
    handleAddRows,
    reportData,
}) => {
    return (
        <div className="flex flex-col lg:flex-row justify-between items-center gap-2">
            <div className="flex flex-col md:flex-row gap-3 sm:gap-5">
                <div className="flex flex-row gap-1 sm:gap-5">
                    <ActionBtn
                        type="button"
                        text="New Teacher"
                        className="transform transition-all duration-500 ease-in-out scale-95 sm:scale-100"
                        onClick={handleAddRows}
                    >
                        <IoMdAddCircle
                            size={24}
                            className="theme-icon dark:text-white transform transition-all duration-500 ease-in-out cursor-pointer hover:scale-110"
                        />
                    </ActionBtn>
                </div>
            </div>
        </div>
    );
};

export default ReportsTableActions;
