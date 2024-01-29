'use client'
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Column } from "react-table";
import { TeacherDetails } from '@/util/types/Reports.type';
import { BasicTable } from '@/components/teacher/BasicTable';
import { BasicColumns } from '@/components/teacher/BasicColumns';
import TableActions from '@/components/teacher/table-columns/Columns';
import useReportData from '@/components/teacher/hooks/useReportData';
import LocalStorageService2 from '@/local/LocalStorageService2';
import FilterSelect from '@/components/course-info/filterSelect';
import AddModal from './partials/Modal/addTeacher';
import EditModal from './partials/Modal/editTeacherInfo';
import DeleteModal from './partials/Modal/deleteTeacher';
import { FilterOptions } from '@/components/common/FilterOption';
import AddEntityButton from '@/components/common/AddEntityButton';

export default function Teachers() {
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [togglePopup, setTogglePopup] = useState<number | null>(null);
    const { getReportEmployee2, setReportEmployee2 } = LocalStorageService2;
    const [teacherDetails, setTeacherDetails] = useState<TeacherDetails[]>(() => getReportEmployee2() || []);

    //destructuring the state and actions for Adding
    const {
        state: isAdding,
        setState: setIsAdding,
        stateAction: addingData,
        setStateAction: setAddingData,
    } = useReportData();

    // Destructuring the state and actions for editing
    const {
        state: isEditing,
        setState: setIsEditing,
        stateAction: editData,
        setStateAction: setEditData,
    } = useReportData();

    // Function to handle adding a new teacher
    const handleAddNewTeacher = () => {
        setIsPopupOpen(false);
        setIsAdding(true);
        setAddingData(null);
    };

    // Function to handle editing a teacher
    const handleEdit = (index: number) => {
        setIsPopupOpen(false);
        setEditData(teacherDetails[index]);
        setEditIndex(index);
        setIsEditing(true);
    };

    // Function to handle deleting a teacher
    const handleDelete = (index: number) => {
        setIsPopupOpen(false);
        setIsDeleting(true);
        setDeleteIndex(index);
    };

    // Function to handle archiving a teacher
    const handleArchive = (index: number) => {
        const updatedTeacherDetails = teacherDetails.map((teacherDetail, i) => {
            if (i === index) {
                return {
                    ...teacherDetail,
                    isArchived: !teacherDetail.isArchived
                };
            }
            return teacherDetail;
        });
        setTeacherDetails(updatedTeacherDetails);
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
                    handleEdit={handleEdit}
                    handleArchive={handleArchive}
                    handleDelete={handleDelete}
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
        const updatedReportData = [...teacherDetails];
        updatedReportData[editIndex!] = data;
        setTeacherDetails(updatedReportData);
        setIsEditing(false);
        setEditIndex(null);
        setEditData(null);
    };

    //function to submit a new teacher
    const submitTeacherInfo = (data: TeacherDetails) => {
        setTeacherDetails((prevData) => [data, ...prevData]);
        setIsAdding(false);
    };

    //function to handle deleting a teacher
    const handleDeleteClick = () => {
        const updatedReportData = [...teacherDetails];
        updatedReportData.splice(deleteIndex!, 1);
        setTeacherDetails(updatedReportData);
        setIsDeleting(false);
    };

    //defining the columns for the table
    const columns: Column<TeacherDetails>[] = [...BasicColumns, ...ActionsColumn];
    const [filter, setFilter] = useState('all');

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

    //updating the reportEmployee2 state with the teacherDetails
    useEffect(() => {
        setReportEmployee2(teacherDetails);
    }, [teacherDetails, setReportEmployee2, filteredTeacherDetails]);

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