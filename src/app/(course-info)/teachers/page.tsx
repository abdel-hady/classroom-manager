'use client'
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Column } from "react-table";
import { BasicTable } from '@/components/teacher/BasicTable';
import { BasicColumns } from '@/components/teacher/BasicColumns';
import TableActions from '@/components/teacher/table-columns/Columns';
import AddModal from './partials/modal/AddTeacher';
import EditModal from './partials/modal/EditTeacherInfo';
import DeleteModal from './partials/modal/DeleteTeacher';
import AddEntityButton from '@/components/common/AddEntityButton';
import { toast } from "react-toastify";
import { TeacherDetails } from '@/util/types/Entity.type';
import LocalStorageServiceTeacher from '@/local/LocalStorageServiceTeacher';
import useTeacherDetails from '@/components/teacher/hooks/useTeacherDetails';
import { handleAddNew, handleArchive, handleDelete, handleEdit } from '@/components/common/CommonFunctions';
import { FilterOptions } from '@/components/common/Filter/FilterOption';
import FilterSelect from '@/components/common/Filter/FilterSelect';

export default function Teachers() {
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [togglePopup, setTogglePopup] = useState<number | null>(null);
    const { getTeacher, setTeacher } = LocalStorageServiceTeacher;
    const [teacherDetails, setTeacherDetails] = useState<TeacherDetails[]>(() => getTeacher() || []);
    const [filter, setFilter] = useState('all');

    //Destructuring the state and actions for Adding
    const {
        state: isAdding,
        setState: setIsAdding,
        stateAction: addingData,
        setStateAction: setAddingData,
    } = useTeacherDetails();

    // Destructuring the state and actions for editing
    const {
        state: isEditing,
        setState: setIsEditing,
        stateAction: editData,
        setStateAction: setEditData,
    } = useTeacherDetails();

    // Function to handle adding a new teacher
    const handleAddNewTeacher = () => {
        handleAddNew(setIsPopupOpen, setIsAdding, setAddingData);
    };

    // Function to handle editing a teacher
    const handleEditTeacher = (index: number) => {
        handleEdit(index, setIsPopupOpen, setEditData, setEditIndex, setIsEditing, teacherDetails);
    };

    // Function to handle deleting a teacher
    const handleDeleteTeacher = (index: number) => {
        handleDelete(index, setIsPopupOpen, setIsDeleting, setDeleteIndex);
    };

    // Function to handle archiving a teacher
    const handleArchiveTeacher = (index: number) => {
        handleArchive(index, teacherDetails, setTeacherDetails, "Teacher");
    };

    //function to toggle the popup and update the state
    const handlePopupToggle = (index: number | null) => {
        setTogglePopup(index);
        setIsPopupOpen(!isPopupOpen);
    };

    // Defining the 'ActionsColumn' for the table, which includes the actions for each row
    const ActionsColumn: Column<TeacherDetails>[] = [
        {
            Header: "Actions",
            accessor: undefined,
            Cell: ({ row }) => (
                <TableActions
                    handleEdit={handleEditTeacher}
                    handleArchive={handleArchiveTeacher}
                    handleDelete={handleDeleteTeacher}
                    isPopupOpen={isPopupOpen}
                    togglePopup={togglePopup}
                    handlePopupToggle={handlePopupToggle}
                    row={row}
                />
            ),
        },
    ];

    //function to update a teacher
    const handleUpdate = (data: TeacherDetails) => {
        const updatedTeacherDetails = [...teacherDetails];
        updatedTeacherDetails[editIndex!] = data;
        setTeacherDetails(updatedTeacherDetails);
        setIsEditing(false);
        setEditIndex(null);
        setEditData(null);
        toast.success("Teacher edited successfully", { position: "top-right" });

    };

    //function to submit a new teacher
    const submitTeacherInfo = (data: TeacherDetails) => {
        setTeacherDetails((prevData) => [data, ...prevData]);
        setIsAdding(false);
        toast.success("Teacher added successfully", { position: "top-right" });
    };

    //function to handle deleting a teacher
    const handleDeleteClick = () => {
        const updatedTeacherDetails = [...teacherDetails];
        updatedTeacherDetails.splice(deleteIndex!, 1);
        setTeacherDetails(updatedTeacherDetails);
        setIsDeleting(false);
        toast.success("Teacher deleted successfully", { position: "top-right" });
    };

    //defining the columns for the table
    const columns: Column<TeacherDetails>[] = [...BasicColumns, ...ActionsColumn];

    //function to handle filter change
    const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setFilter(e.target.value);
    };

    //filtering the teacherDetails based on the selected filter
    const filteredTeacherDetails = teacherDetails.filter((detail) => {
        if (filter === 'archived') {
            return detail.isArchived;
        } else if (filter === 'unarchived') {
            return !detail.isArchived;
        }
        return true;
    });

    //displaying the data based on the filter
    const dataToDisplay = filter === 'all' ? teacherDetails : filteredTeacherDetails;

    //updating the teacherDeatails state with the teacherDetails
    useEffect(() => {
        setTeacher(teacherDetails);
    }, [teacherDetails, setTeacher, filteredTeacherDetails]);

    return (
        <>
            <div className='w-full flex flex-col'>
                <div className='w-full flex justify-between'>
                    <FilterSelect value={filter} options={FilterOptions} onChange={handleFilterChange} />
                    <AddEntityButton
                        handleAddEntity={handleAddNewTeacher}
                        entityType="New Teacher"
                    />
                </div>
                <BasicTable
                    data={dataToDisplay}
                    columns={columns}
                />
                <AddModal
                    isOpen={isAdding}
                    handleAddTeacher={submitTeacherInfo}
                    onRequestClose={() => setIsAdding(false)}
                    title="Add New Teacher"
                />
                <EditModal
                    isOpen={isEditing}
                    initialData={editData!}
                    handleUpdate={handleUpdate}
                    onRequestClose={() => setIsEditing(false)}
                    title="Edit Teacher Info"
                />
                <DeleteModal
                    isOpen={isDeleting}
                    setIsDeleting={setIsDeleting}
                    handleDeleteClick={handleDeleteClick}
                    onRequestClose={() => setIsDeleting(false)}
                />
            </div>
        </>
    )
}