import React from 'react';
import { CustomModal } from '@/components/common/CustomModal';
import EditClassInfo from '../edit-class/editClassInfo';
import { ClassDetails } from '@/util/types/Entity.type';

interface EditModalProps {
    isOpen: boolean;
    initialData: ClassDetails;
    handleUpdate: (data: ClassDetails) => void;
    onRequestClose: () => void;
    title: string;
}
const EditModal = ({ isOpen, initialData, handleUpdate, onRequestClose, title }: EditModalProps) => {
    return (
        <CustomModal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Edit Class"
            className="w-[96%] sm:w-[90%] lg:w-[70%] xl:w-[60%] 2xl:w-[50%]"
        >
            <EditClassInfo initialData={initialData} onUpdate={handleUpdate} title={title} />
        </CustomModal>
    );
};

export default EditModal;
