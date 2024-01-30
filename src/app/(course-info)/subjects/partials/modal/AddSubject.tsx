import React from 'react';
import { CustomModal } from '@/components/common/CustomModal';
import { SubjectDetails } from '@/util/types/Entity.type';
import AddSubject from '../add-subject/AddSubjectInfo';

interface AddModalProps {
    isOpen: boolean;
    handleAddSubject: (data: SubjectDetails) => void;
    onRequestClose: () => void;
    title: string;
}

const AddModal = ({ isOpen, handleAddSubject, onRequestClose, title }: AddModalProps) => {
    return (
        <CustomModal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Add Subject"
            className="w-[96%] left-[2%] sm:w-[90%] sm:left-[5%] lg:w-[70%] lg:left-[15%] xl:w-[60%] xl:left-[20%] 2xl:w-[50%] 2xl:left-[25%]"
        >
            <AddSubject onAddSubject={handleAddSubject} title={title}/>
        </CustomModal>
    );
};

export default AddModal;
