"use client"
import { useEffect, useState } from "react";
import { Column } from "react-table";
import { useAuth } from "@/providers/AuthProvider";
import TopBar from "@/components/TopBar";
import { ClassDetails } from "@/util/types/Reports.type";
import { BasicTable } from "@/components/BasicTable";
import LocalStorageService from "@/local/LocalStorageService";
import { capitalizeFirstLetter } from "@/components/stringHelpers";
import { BasicColumns } from "@/components/BasicColumns";
// import ReportsTableActions from "@/components/ReportsTableActions";
// import TableActions from "@/components/table-columns/Columns";
import useReportData from "@/components/hooks/useReportData";
import { useRouter } from "next/navigation";

export default function Home() {
  const {
    state: isAdding,
    setState: setIsAdding,
    stateAction: addingData,
    setStateAction: setAddingData,
  } = useReportData();
  const {
    state: isEditing,
    setState: setIsEditing,
    stateAction: editData,
    setStateAction: setEditData,
  } = useReportData();

  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [togglePopup, setTogglePopup] = useState<number | null>(null);

  const [selectedRows, setSelectedRows] = useState<ClassDetails[]>();

  const { getReportEmployee, setReportEmployee } = LocalStorageService;
  const router = useRouter();
  const { user } = useAuth();

  const handleAddNewReport = () => {
    setIsPopupOpen(false);
    setIsAdding(true);
    setAddingData(null);
  };
  const [reportData, setReportData] = useState<ClassDetails[]>(
    () => getReportEmployee() || []
  );

  useEffect(() => {
    setReportEmployee(reportData);
  }, [reportData, setReportEmployee]);


  // const ActionsColumn: Column<ReportData>[] = [
  //   {
  //     Header: "Actions",
  //     accessor: undefined,
  //     Cell: ({ row }) => (
  //       <TableActions
  //         handleEdit={handleEdit}
  //         handleShow={handleShow}
  //         handleDelete={handleDelete}
  //         isPopupOpen={isPopupOpen}
  //         togglePopup={togglePopup}
  //         handlePopupToggle={handlePopupToggle}
  //         row={row}
  //       />
  //     ),
  //   },
  // ];
  // const columns: Column<ReportData>[] = [...BasicColumns, ...ActionsColumn];

  function handleSelectedRowsChange(rows: ClassDetails[]) {
    setSelectedRows(rows);
  }

  const handleDeleteSeleted = () => {
    if (selectedRows?.length !== undefined && selectedRows.length > 0) {
      setIsPopupOpen(false);
    }
  };
  const username = capitalizeFirstLetter(user ? user!.name : "");
  return (
    <div className="relative">
      {/* <TopBar /> */}
      <div className="absolute top-32 md:top-32 left-2 w-[96%] sm:left-0 sm:w-full h-[65%] xl:h-[70%] flex justify-center items-center">
        <div className="w-full sm:w-[90%] p-0 rounded-3xl h-[100%] flex flex-col gap-5">
          {/* <ReportsTableActions
            username={username!}
            handleDeleteRows={handleDeleteSeleted}
            handleAddRows={handleAddNewReport}
            reportData={reportData}
          /> */}

          <div className="bg-[#ffffffb5] w-full flex justify-center items-start min-h-[350px] lg:min-h-[100%] xl:min-h-[715px] overflow-auto scrollbar-none rounded-xl shadow-lg">
            {/* <BasicTable
              data={reportData}
              columns={columns}
              onSelectedRowsChange={handleSelectedRowsChange}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
