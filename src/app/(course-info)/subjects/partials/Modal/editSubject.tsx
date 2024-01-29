import React from 'react';
import { CustomModal } from '@/components/common/CustomModal';
import EditSubjectInfo from '../edit-subject/editSubjectInfo';
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
            className="w-[96%] sm:w-[90%] lg:w-[70%] xl:w-[60%] 2xl:w-[50%]"
        >
            <EditSubjectInfo initialData={initialData} onUpdate={handleUpdate} title={title} />
        </CustomModal>
    );
};

export default EditModal;
