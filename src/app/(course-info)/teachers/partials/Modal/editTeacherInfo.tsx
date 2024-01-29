import React from 'react';
import { CustomModal } from '@/components/common/CustomModal';
import EditTeacherInfo from '../edit-teacher/editTeacherInfo';
import { TeacherDetails } from '@/util/types/Reports.type';

interface EditModalProps {
    isOpen: boolean;
    initialData: TeacherDetails;
    handleUpdate: (data: TeacherDetails) => void;
    onRequestClose: () => void;
    title: string;
}
const EditModal = ({ isOpen, initialData, handleUpdate, onRequestClose, title }: EditModalProps) => {
    return (
        <CustomModal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Edit Report"
            className="w-[96%] sm:w-[90%] lg:w-[70%] xl:w-[60%] 2xl:w-[50%]"
        >
            <EditTeacherInfo initialData={initialData} onUpdate={handleUpdate} title={title} />
        </CustomModal>
    );
};

export default EditModal;
