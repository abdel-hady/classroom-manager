import React from 'react';
import { CustomModal } from '@/components/common/CustomModal';
import DeleteRow from '../deleteRow';

interface DeleteModalProps {
    isOpen: boolean;
    setIsDeleting: React.Dispatch<React.SetStateAction<boolean>>;
    handleDeleteClick: () => void;
    onRequestClose: () => void;
}
const DeleteModal = ({ isOpen, setIsDeleting, handleDeleteClick, onRequestClose }: DeleteModalProps) => {
    return (
        <CustomModal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Delete Subject"
            className="w-[90%] sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[40%] 2xl:w-[35%]"
        >
            <DeleteRow setIsDeleting={setIsDeleting} handleDeleteClick={handleDeleteClick} />
        </CustomModal>
    );
};

export default DeleteModal;
