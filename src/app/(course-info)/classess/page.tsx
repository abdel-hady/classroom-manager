'use client'
import React, { ChangeEvent, useEffect, useState } from 'react';
import { IoIosSearch } from "react-icons/io";
import { Column } from "react-table";
import { BasicTable } from '@/components/BasicTable';
import { ClassDetails } from '@/util/types/Reports.type';
import TableActions from '@/components/table-columns/Columns';
import { BasicColumns } from '@/components/BasicColumns';
import useReportData from '@/components/hooks/useReportData';
import ReportsTableActions from '@/components/ReportsTableActions';
import { CustomModal } from '@/components/common/CustomModal';
import AddReport from './partials/add-class';
import LocalStorageService from '@/local/LocalStorageService';
import EditReport from './partials/edit-class';
import DeleteRow from './partials/DeleteRow';
import { toast } from "react-toastify";
import FilterSelect from '@/components/course-info/filterSelect';

export default function Classess() {
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);

    const {
        state: isAdding,
        setState: setIsAdding,
        stateAction: addingData,
        setStateAction: setAddingData,
    } = useReportData();
    const {
        state: isEditing,
        setState: setIsEditing,
        stateAction: editData,
        setStateAction: setEditData,
    } = useReportData();
    const [searchQuery, setSearchQuery] = useState('');
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleSearch = (e: any) => {
        setSearchQuery(e.target.value);
        // Add your search logic here, such as filtering the classes based on the search query
    };
    const handleAddNewReport = () => {
        setIsPopupOpen(false);
        setIsAdding(true);
        setAddingData(null);
        toast.success("Task added successfully", { position: "top-right" });
    };
    const handleEdit = (index: number) => {
        setIsPopupOpen(false);
        setEditData(classDetails[index]);
        setEditIndex(index);
        setIsEditing(true);
    };
    const handleDelete = (index: number) => {
        setIsPopupOpen(false);
        setIsDeleting(true);
        setDeleteIndex(index);
    };

    const handleArchive = (index: number) => {
        const updatedClassDetails = classDetails.map((classDetail, i) => {
            if (i === index) {
                return {
                    ...classDetail,
                    isArchived: !classDetail.isArchived
                };
            }
            return classDetail;
        });
        setClassDetails(updatedClassDetails);
        !classDetails[index].isArchived ?
            toast.success('Class archived successfully', { position: 'top-right' }) :
            toast.success('Class unarchived successfully', { position: 'top-right' });
    };
    const handlePopupToggle = (index: number | null) => {
        setTogglePopup(index);
        setIsPopupOpen(!isPopupOpen);
    };
    const { getReportEmployee, setReportEmployee } = LocalStorageService;

    const [togglePopup, setTogglePopup] = useState<number | null>(null);
    const [classDetails, setClassDetails] = useState<ClassDetails[]>(() => getReportEmployee() || []);

    const ActionsColumn: Column<ClassDetails>[] = [
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
    const handleUpdate = (data: ClassDetails) => {
        const updatedReportData = [...classDetails];
        updatedReportData[editIndex!] = data;
        setClassDetails(updatedReportData);
        setIsEditing(false);
        setEditIndex(null);
        setEditData(null);
        toast.success("Task edited successfully", { position: "top-right" });

    };
    const handleReportSubmit = (data: ClassDetails) => {
        setClassDetails((prevData) => [data, ...prevData]);
        setIsAdding(false);
        toast.success("Task added successfully", { position: "top-right" });

    };
    const handleDeleteClick = () => {
        const updatedReportData = [...classDetails];
        updatedReportData.splice(deleteIndex!, 1);
        setClassDetails(updatedReportData);
        setIsDeleting(false);
        toast.success("Task deleted successfully", { position: "top-right" });
    };
    const columns: Column<ClassDetails>[] = [...BasicColumns, ...ActionsColumn];
    const [filter, setFilter] = useState('all');

    const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setFilter(e.target.value);
    };

    const filteredClassDetails = classDetails.filter((detail) => {
        if (filter === 'archived') {
            return detail.isArchived;
        } else if (filter === 'unarchived') {
            return !detail.isArchived;
        }
        return true;
    });

    const classessFilterOptions = [{ value: "all", label: "All" }, { value: "archived", label: "Archived" }, { value: "unarchived", label: "Unarchived" }]
    const dataToDisplay = filter === 'all' ? classDetails : filteredClassDetails;
    useEffect(() => {
        setReportEmployee(classDetails);
    }, [classDetails, setReportEmployee, filteredClassDetails]);

    return (
        <>
            <div className='w-full flex flex-col'>
                <div className='w-full flex justify-between'>
                    <div className="flex items-center gap-2 text-gray-900">
                        <FilterSelect value={filter} options={classessFilterOptions} onChange={handleFilterChange} />
                    </div>
                    <div>
                        <ReportsTableActions
                            handleAddRows={handleAddNewReport}
                            reportData={classDetails}
                        />
                    </div>
                </div>
                <BasicTable
                    data={dataToDisplay}
                    columns={columns}
                />
                <CustomModal
                    isOpen={isAdding}
                    onRequestClose={() => setIsAdding(false)}
                    contentLabel="Add Report"
                    className="w-[96%] sm:w-[90%] lg:w-[70%] xl:w-[60%] 2xl:w-[50%]"
                >
                    <AddReport onAddReport={handleReportSubmit} />
                </CustomModal>
                <CustomModal
                    isOpen={isEditing}
                    onRequestClose={() => setIsEditing(false)}
                    contentLabel="Edit Report"
                    className="w-[96%] sm:w-[90%] lg:w-[70%] xl:w-[60%] 2xl:w-[50%]"
                >
                    <EditReport initialData={editData!} onUpdate={handleUpdate} />
                </CustomModal>
                <CustomModal
                    isOpen={isDeleting}
                    onRequestClose={() => setIsDeleting(false)}
                    contentLabel="Delete Report"
                    className="left-1/3 top-1/3 w-[90%] sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[40%] 2xl:w-[35%]"
                >
                    <DeleteRow
                        setIsDeleting={setIsDeleting}
                        handleDeleteClick={handleDeleteClick}
                    />
                </CustomModal>
            </div>
        </>
    )
}