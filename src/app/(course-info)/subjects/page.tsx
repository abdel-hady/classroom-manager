'use client'
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Column } from "react-table";
import AddEntityButton from '@/components/common/AddEntityButton';
import { toast } from "react-toastify";
import { handleAddNew, handleArchive, handleDelete, handleEdit } from '@/components/common/CommonFunctions';
import FilterSelect from '@/components/common/Filter/filterSelect';
import { FilterOptions } from '@/components/common/Filter/FilterOption';
import LocalStorageServiceSubject from '@/local/LocalStorageServiceSubject';
import { SubjectDetails } from '@/util/types/Entity.type';
import useSubjectDetails from '@/components/subject/hooks/useSubjectDetials';
import DeleteModal from './partials/modal/DeleteSubject';
import EditModal from './partials/modal/EditSubject';
import AddModal from './partials/modal/AddSubject';
import { BasicTable } from '@/components/subject/BasicTable';
import { BasicColumns } from '@/components/subject/BasicColumns';
import TableActions from '@/components/subject/table-columns/Columns';

export default function Subjects() {
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [togglePopup, setTogglePopup] = useState<number | null>(null);
    const { getSubject, setSubject } = LocalStorageServiceSubject;
    const [subjectDetails, setSubjectDetails] = useState<SubjectDetails[]>(() => getSubject() || []);
    const [filter, setFilter] = useState('all');

    //Destructuring the state and actions for Adding
    const {
        state: isAdding,
        setState: setIsAdding,
        stateAction: addingData,
        setStateAction: setAddingData,
    } = useSubjectDetails();

    // Destructuring the state and actions for editing
    const {
        state: isEditing,
        setState: setIsEditing,
        stateAction: editData,
        setStateAction: setEditData,
    } = useSubjectDetails();

    // Function to handle adding a new subject
    const handleAddNewSubject = () => {
        handleAddNew(setIsPopupOpen, setIsAdding, setAddingData);
    };

    // Function to handle editing a subject
    const handleEditSubject = (index: number) => {
        handleEdit(index, setIsPopupOpen, setEditData, setEditIndex, setIsEditing, subjectDetails);
    };

    // Function to handle deleting a subject
    const handleDeleteSubject = (index: number) => {
        handleDelete(index, setIsPopupOpen, setIsDeleting, setDeleteIndex);
    };

    // Function to handle archiving a subject
    const handleArchiveSubject = (index: number) => {
        handleArchive(index, subjectDetails, setSubjectDetails, "Subject");
    };

    //function to toggle the popup and update the state
    const handlePopupToggle = (index: number | null) => {
        setTogglePopup(index);
        setIsPopupOpen(!isPopupOpen);
    };

    // Defining the 'ActionsColumn' for the table, which includes the actions for each row
    const ActionsColumn: Column<SubjectDetails>[] = [
        {
            Header: "Actions",
            accessor: undefined,
            Cell: ({ row }) => (
                <TableActions
                    handleEdit={handleEditSubject}
                    handleArchive={handleArchiveSubject}
                    handleDelete={handleDeleteSubject}
                    isPopupOpen={isPopupOpen}
                    togglePopup={togglePopup}
                    handlePopupToggle={handlePopupToggle}
                    row={row}
                />
            ),
        },
    ];

    //function to update a subject
    const handleUpdate = (data: SubjectDetails) => {
        const updatedSubjectDetails = [...subjectDetails];
        updatedSubjectDetails[editIndex!] = data;
        setSubjectDetails(updatedSubjectDetails);
        setIsEditing(false);
        setEditIndex(null);
        setEditData(null);
        toast.success("Subject edited successfully", { position: "top-right" });

    };

    //function to submit a new subject
    const submitSubjectInfo = (data: SubjectDetails) => {
        setSubjectDetails((prevData) => [data, ...prevData]);
        setIsAdding(false);
        toast.success("Subject added successfully", { position: "top-right" });
    };

    //function to handle deleting a subject
    const handleDeleteClick = () => {
        const updatedSubjectDetails = [...subjectDetails];
        updatedSubjectDetails.splice(deleteIndex!, 1);
        setSubjectDetails(updatedSubjectDetails);
        setIsDeleting(false);
        toast.success("Subject deleted successfully", { position: "top-right" });
    };

    //defining the columns for the table
    const columns: Column<SubjectDetails>[] = [...BasicColumns, ...ActionsColumn];

    //function to handle filter change
    const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setFilter(e.target.value);
    };

    //filtering the subjectDetails based on the selected filter
    const filteredSubjectDetails = subjectDetails.filter((detail) => {
        if (filter === 'archived') {
            return detail.isArchived;
        } else if (filter === 'unarchived') {
            return !detail.isArchived;
        }
        return true;
    });

    //displaying the data based on the filter
    const dataToDisplay = filter === 'all' ? subjectDetails : filteredSubjectDetails;

    //updating the subjectDeatails state with the subjectDetails
    useEffect(() => {
        setSubject(subjectDetails);
    }, [subjectDetails, setSubject, filteredSubjectDetails]);

    return (
        <>
            <div className='w-full flex flex-col'>
                <div className='w-full flex justify-between'>
                    <FilterSelect value={filter} options={FilterOptions} onChange={handleFilterChange} />
                    <AddEntityButton
                        handleAddEntity={handleAddNewSubject}
                        entityType="New Subject"
                    />
                </div>
                <BasicTable
                    data={dataToDisplay}
                    columns={columns}
                />
                <AddModal
                    isOpen={isAdding}
                    handleAddSubject={submitSubjectInfo}
                    onRequestClose={() => setIsAdding(false)}
                    title="Add New Subject"
                />
                <EditModal
                    isOpen={isEditing}
                    initialData={editData!}
                    handleUpdate={handleUpdate}
                    onRequestClose={() => setIsEditing(false)}
                    title="Edit Subject Info"
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