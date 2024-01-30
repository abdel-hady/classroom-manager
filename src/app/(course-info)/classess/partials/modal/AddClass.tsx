import React from 'react';
import { CustomModal } from '@/components/common/CustomModal';
import AddClass from '../add-class/AddClassInfo';
import { ClassDetails } from '@/util/types/Entity.type';

interface AddModalProps {
    isOpen: boolean;
    handleAddClass: (data: ClassDetails) => void;
    onRequestClose: () => void;
    title: string;
}

const AddModal = ({ isOpen, handleAddClass, onRequestClose, title }: AddModalProps) => {
    return (
        <CustomModal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Add Class"
            className="w-[96%] left-[2%] sm:w-[90%] sm:left-[5%] lg:w-[70%] lg:left-[15%] xl:w-[60%] xl:left-[20%] 2xl:w-[50%] 2xl:left-[25%]"
        >
            <AddClass onAddClass={handleAddClass} title={title} />
        </CustomModal>
    );
};

export default AddModal;
