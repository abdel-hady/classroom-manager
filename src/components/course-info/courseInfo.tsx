// import React, { useState, useEffect } from 'react';
// import { BasicTable } from '@/components/BasicTable';
// import { CustomModal } from '@/components/common/CustomModal';
// // import AddReport from './AddReport';
// // import EditReport from './EditReport';
// // import DeleteReport from './DeleteReport';
// import { toast } from 'react-toastify';

// const ReportsComponent = ({ reportType, reportData, handleAddNewReport, handleEditReport, handleDeleteReport, ...otherProps }) => {
//     return (
//         <>
//             {/* Common UI for displaying reports */}
//             <BasicTable data={reportData} {...otherProps} />

//             {/* Common UI for adding, editing, and deleting reports */}
//             <CustomModal isOpen={isAdding} onRequestClose={() => setIsAdding(false)} contentLabel="Add Report">
//                 <AddReport onAddReport={handleAddNewReport} />
//             </CustomModal>
//             <CustomModal isOpen={isEditing} onRequestClose={() => setIsEditing(false)} contentLabel="Edit Report">
//                 <EditReport initialData={editData} onUpdate={handleEditReport} />
//             </CustomModal>
//             <CustomModal isOpen={isDeleting} onRequestClose={() => setIsDeleting(false)} contentLabel="Delete Report">
//                 <DeleteReport onDelete={handleDeleteReport} />
//             </CustomModal>
//         </>
//     );
// };

// export default ReportsComponent;