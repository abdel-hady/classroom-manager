import { toast } from "react-toastify";

export const handleEdit = (index: number,
    setIsPopupOpen: (value: boolean) => void,
    setEditData: (value: any) => void,
    setEditIndex: (value: number | null) => void,
    setIsEditing: (value: boolean) => void,
    data: any[]) => {
    setIsPopupOpen(false);
    setEditData(data[index]);
    setEditIndex(index);
    setIsEditing(true);
};

export const handleAddNew = (setIsPopupOpen: (value: boolean) => void,
    setIsAdding: (value: boolean) => void,
    setAddingData: (value: any) => void) => {
    setIsPopupOpen(false);
    setIsAdding(true);
    setAddingData(null);
}

export const handleDelete = (index: number, setIsPopupOpen: (value: boolean) => void, setIsDeleting: (value: boolean) => void, setDeleteIndex: (value: number | null) => void) => {
    setIsPopupOpen(false);
    setIsDeleting(true);
    setDeleteIndex(index);
};

export const handleArchive = (index: number, details: any[], setDetails: (updatedDetails: any[]) => void, toastMessage?: string) => {
    const updatedDetails = details.map((detail, i) => {
        if (i === index) {
            return {
                ...detail,
                isArchived: !detail.isArchived
            };
        }
        return detail;
    });
    setDetails(updatedDetails);
    if (toastMessage) {
        !details[index].isArchived ?
            toast.success(`${toastMessage} archived successfully'`, { position: 'top-right' }) :
            toast.success(`${toastMessage} unarchived successfully'`, { position: 'top-right' });
    }
};

