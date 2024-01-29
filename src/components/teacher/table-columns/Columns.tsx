import React, { useEffect, useState } from "react";
import { BiDotsVerticalRounded, BiShowAlt } from "react-icons/bi";
import { LuFileEdit } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Tooltip } from "react-tooltip";
import { MdOutlineUnarchive, MdOutlineArchive } from "react-icons/md";
import { TeacherDetails } from "@/util/types/Entity.type";
interface Props {
    handleEdit: (index: number) => void;
    handleArchive: (index: number) => void;
    handleDelete: (index: number) => void;
    isPopupOpen: boolean;
    togglePopup: number | null;
    handlePopupToggle: (index: number | null) => void;
    row: {
        id: string,
        original: TeacherDetails;
    };
}

export default function TableActions({
    handleEdit,
    handleArchive,
    handleDelete,
    isPopupOpen,
    togglePopup,
    handlePopupToggle,
    row,
}: Props) {
    const [isArchived, setIsArchived] = useState(false);
    return (
        <>
            <div className="relative flex justify-center sm:hidden">
                <BiDotsVerticalRounded
                    size={24}
                    className="z-0 hover:text-gray-500 cursor-pointer"
                    onClick={() => handlePopupToggle(parseInt(row.id))}
                />
                {isPopupOpen && togglePopup === parseInt(row.id) && (
                    <>
                        <div className="absolute left-0 top-6 bg-white border border-gray-300 rounded shadow p-2 z-[1]">
                            <div className="flex flex-col sm:flex-row justify-center items-center gap-2">
                                <LuFileEdit
                                    size={24}
                                    className="hover:dark:text-green-500 cursor-pointer hover:scale-105 outline-none"
                                    onClick={() => handleEdit(parseInt(row.id))}
                                />
                                {row.original.isArchived ?
                                    <MdOutlineArchive
                                        size={30}
                                        className="hover:dark:text-yellow-500 cursor-pointer hover:scale-105 outline-none"
                                        onClick={() => handleArchive(parseInt(row.id))}
                                    /> :
                                    <MdOutlineUnarchive
                                        size={30}
                                        className="hover:dark:text-yellow-500 cursor-pointer hover:scale-105 outline-none"
                                        onClick={() => handleArchive(parseInt(row.id))}
                                    />
                                }
                                <RiDeleteBin6Line
                                    size={24}
                                    className="hover:dark:text-red-500 cursor-pointer hover:scale-105 outline-none"
                                    onClick={() => handleDelete(parseInt(row.id))}
                                />
                            </div>
                        </div>
                    </>
                )}
            </div>
            <div className="hidden sm:flex fles-row justify-center items-center gap-1">
                <LuFileEdit
                    size={24}
                    className="hover:dark:text-green-500 cursor-pointer hover:scale-105"
                    onClick={() => handleEdit(parseInt(row.id))}
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content="edit row"
                />
                {row.original.isArchived ?
                    <MdOutlineArchive
                        size={32}
                        className="hover:dark:text-yellow-500 cursor-pointer hover:scale-105"
                        onClick={() => handleArchive(parseInt(row.id))}
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content="archive row"
                    /> :
                    <MdOutlineUnarchive
                        size={32}
                        className="hover:dark:text-yellow-500 cursor-pointer hover:scale-105"
                        onClick={() => { handleArchive(parseInt(row.id)) }}
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content="unarchive row"
                    />
                }
                <RiDeleteBin6Line
                    size={24}
                    className="hover:dark:text-red-500 cursor-pointer hover:scale-105"
                    onClick={() => handleDelete(parseInt(row.id))}
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content="delete row"
                />
                <Tooltip id="my-tooltip" />
            </div>
        </>
    )
}
