import React from 'react';
import { CustomModal } from '@/components/common/CustomModal';
import DeleteRow from '../DeleteRow';

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
            className="left-[5%] w-[90%] sm:w-[70%] sm:left-[15%] md:w-[60%] md:left-[20%] lg:w-[50%] lg:left-[25%] xl:w-[40%] xl:left-[30%] 2xl:w-[36%] 2xl:left-[32%]"
        >
            <DeleteRow setIsDeleting={setIsDeleting} handleDeleteClick={handleDeleteClick} />
        </CustomModal>
    );
};

export default DeleteModal;
