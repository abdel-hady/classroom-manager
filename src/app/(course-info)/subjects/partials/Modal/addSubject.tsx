import React from 'react';
import { CustomModal } from '@/components/common/CustomModal';
import { SubjectDetails } from '@/util/types/Entity.type';
import AddSubject from '../add-subject/addSubjectInfo';

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
            className="w-[96%] sm:w-[90%] lg:w-[70%] xl:w-[60%] 2xl:w-[50%]"
        >
            <AddSubject onAddSubject={handleAddSubject} title={title}/>
        </CustomModal>
    );
};

export default AddModal;
