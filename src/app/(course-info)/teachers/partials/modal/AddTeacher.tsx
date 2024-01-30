import React from 'react';
import { CustomModal } from '@/components/common/CustomModal';
import AddTeacher from '../add-teacher/AddTeacherInfo';
import { TeacherDetails } from '@/util/types/Entity.type';

interface AddModalProps {
    isOpen: boolean;
    handleAddTeacher: (data: TeacherDetails) => void;
    onRequestClose: () => void;
    title: string;
}

const AddModal = ({ isOpen, handleAddTeacher, onRequestClose, title }: AddModalProps) => {
    return (
        <CustomModal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Add Teacher"
            className="w-[96%] left-[2%] sm:w-[90%] sm:left-[5%] lg:w-[70%] lg:left-[15%] xl:w-[60%] xl:left-[20%] 2xl:w-[50%] 2xl:left-[25%]"
        >
            <AddTeacher onAddTeacher={handleAddTeacher} title={title}/>
        </CustomModal>
    );
};

export default AddModal;
