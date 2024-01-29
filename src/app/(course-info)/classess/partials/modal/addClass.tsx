import React from 'react';
import { CustomModal } from '@/components/common/CustomModal';
import AddClass from '../add-class/addClassInfo';
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
            className="w-[96%] sm:w-[90%] lg:w-[70%] xl:w-[60%] 2xl:w-[50%]"
        >
            <AddClass onAddClass={handleAddClass} title={title} />
        </CustomModal>
    );
};

export default AddModal;
