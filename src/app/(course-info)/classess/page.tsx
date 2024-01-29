'use client'
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Column } from "react-table";
import { toast } from "react-toastify";
import AddEntityButton from '@/components/common/AddEntityButton';
import { BasicTable } from '@/components/class/BasicTable';
import AddModal from './partials/modal/addClass';
import EditModal from './partials/modal/editClassInfo';
import DeleteModal from './partials/modal/deleteClass';
import LocalStorageServiceClass from '@/local/LocalStorageServiceClass';
import { ClassDetails } from '@/util/types/Entity.type';
import useClassDetails from '@/components/class/hooks/useClassDetials';
import TableActions from '@/components/class/table-columns/Columns';
import { BasicColumns } from '@/components/class/BasicColumns';
import { handleAddNew, handleArchive, handleDelete, handleEdit } from '@/components/common/CommonFunctions';
import FilterSelect from '@/components/common/Filter/filterSelect';
import { FilterOptions } from '@/components/common/Filter/FilterOption';

export default function Classess() {
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const { getClass, setClass } = LocalStorageServiceClass;
    const [togglePopup, setTogglePopup] = useState<number | null>(null);
    const [classDetails, setClassDetails] = useState<ClassDetails[]>(() => getClass() || []);
    const [filter, setFilter] = useState('all');

    //Destructuring the state and actions for Adding
    const {
        state: isAdding,
        setState: setIsAdding,
        stateAction: addingData,
        setStateAction: setAddingData,
    } = useClassDetails();

    //Dstructuring the state and actions for Editing
    const {
        state: isEditing,
        setState: setIsEditing,
        stateAction: editData,
        setStateAction: setEditData,
    } = useClassDetails();
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    // Function to handle adding a new class and showing a success message
    const handleAddNewClass = () => {
        handleAddNew(setIsPopupOpen, setIsAdding, setAddingData);
    };

    // Function to handle editing a class
    const handleEditClass = (index: number) => {
        handleEdit(index, setIsPopupOpen, setEditData, setEditIndex, setIsEditing, classDetails);
    };

    // Function to handle deleting a class
    const handleDeleteClass = (index: number) => {
        handleDelete(index, setIsPopupOpen, setIsDeleting, setDeleteIndex);

    };

    // Function to handle archiving/unarchiving a class
    const handleArchiveClass = (index: number) => {
        handleArchive(index, classDetails, setClassDetails, "Class");
    };

    // Function to handle toggling the popup for a specific class
    const handlePopupToggle = (index: number | null) => {
        setTogglePopup(index);
        setIsPopupOpen(!isPopupOpen);
    };

    // Columns for the table, including actions such as edit, archive, and delete
    const ActionsColumn: Column<ClassDetails>[] = [
        {
            Header: "Actions",
            accessor: undefined,
            Cell: ({ row }) => (
                <TableActions
                    handleEdit={handleEditClass}
                    handleArchive={handleArchiveClass}
                    handleDelete={handleDeleteClass}
                    isPopupOpen={isPopupOpen}
                    togglePopup={togglePopup}
                    handlePopupToggle={handlePopupToggle}
                    row={row}
                />
            ),
        },
    ];
    const columns: Column<ClassDetails>[] = [...BasicColumns, ...ActionsColumn];

    // Function to handle updating a class
    const handleUpdate = (data: ClassDetails) => {
        const updatedClassDetails = [...classDetails];
        updatedClassDetails[editIndex!] = data;
        setClassDetails(updatedClassDetails);
        setIsEditing(false);
        setEditIndex(null);
        setEditData(null);
        toast.success("Class edited successfully", { position: "top-right" });
    };

    // Function to submit class information and show a success message
    const submitClassInfo = (data: ClassDetails) => {
        setClassDetails((prevData) => [data, ...prevData]);
        setIsAdding(false);
        toast.success("Class added successfully", { position: "top-right" });
    };

    // Function to handle deleting a class and show a success message
    const handleDeleteClick = () => {
        const updatedClassDetails = [...classDetails];
        updatedClassDetails.splice(deleteIndex!, 1);
        setClassDetails(updatedClassDetails);
        setIsDeleting(false);
        toast.success("Class deleted successfully", { position: "top-right" });
    }

    // Function to handle filter change
    const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setFilter(e.target.value);
    };

    // Filtering the classDetails based on the selected filter
    const filteredClassDetails = classDetails.filter((detail) => {
        if (filter === 'archived') {
            return detail.isArchived;
        } else if (filter === 'unarchived') {
            return !detail.isArchived;
        }
        return true;
    });

    // Determine the data to display based on the selected filter
    const dataToDisplay = filter === 'all' ? classDetails : filteredClassDetails;

    // Update the classDetails in local storage when classDetails or the filtered data changes
    useEffect(() => {
        setClass(classDetails);
    }, [classDetails, setClass, filteredClassDetails]);

    return (
        <>
            <div className='w-full flex flex-col'>
                <div className='w-full flex justify-between'>
                    <FilterSelect value={filter} options={FilterOptions} onChange={handleFilterChange} />
                    <AddEntityButton
                        handleAddEntity={handleAddNewClass}
                        entityType="New Class"
                    />
                </div>
                <BasicTable
                    data={dataToDisplay}
                    columns={columns}
                />
                <AddModal
                    isOpen={isAdding}
                    handleAddClass={submitClassInfo}
                    onRequestClose={() => setIsAdding(false)}
                    title="Add New Class"
                />
                <EditModal
                    isOpen={isEditing}
                    initialData={editData!}
                    handleUpdate={handleUpdate}
                    onRequestClose={() => setIsEditing(false)}
                    title="Edit Class Info"
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