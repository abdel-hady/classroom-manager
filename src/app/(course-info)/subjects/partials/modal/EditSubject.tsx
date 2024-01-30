import React from 'react';
import { CustomModal } from '@/components/common/CustomModal';
import EditSubjectInfo from '../edit-subject/EditSubjectInfo';
import { SubjectDetails } from '@/util/types/Entity.type';

interface EditModalProps {
    isOpen: boolean;
    initialData: SubjectDetails;
    handleUpdate: (data: SubjectDetails) => void;
    onRequestClose: () => void;
    title: string;
}
const EditModal = ({ isOpen, initialData, handleUpdate, onRequestClose, title }: EditModalProps) => {
    return (
        <CustomModal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Edit Subject"
            className="w-[96%] left-[2%] sm:w-[90%] sm:left-[5%] lg:w-[70%] lg:left-[15%] xl:w-[60%] xl:left-[20%] 2xl:w-[50%] 2xl:left-[25%]"
        >
            <EditSubjectInfo initialData={initialData} onUpdate={handleUpdate} title={title} />
        </CustomModal>
    );
};

export default EditModal;
