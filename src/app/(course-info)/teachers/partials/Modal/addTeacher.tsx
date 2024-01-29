import React from 'react';
import { CustomModal } from '@/components/common/CustomModal';
import AddTeacher from '../add-teacher/addTeacherInfo';
import { TeacherDetails } from '@/util/types/Reports.type';

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
            contentLabel="Add Report"
            className="w-[96%] sm:w-[90%] lg:w-[70%] xl:w-[60%] 2xl:w-[50%]"
        >
            <AddTeacher onAddTeacher={handleAddTeacher} title={title}/>
        </CustomModal>
    );
};

export default AddModal;
