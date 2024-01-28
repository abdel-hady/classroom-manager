import { TeacherDetails } from "../util/types/Reports.type";

const REPORT_DATA_KEY_2: string = "teacherDetails";

const LocalStorageService2 = {

    getReportEmployee2: (): TeacherDetails[] => {
        if (typeof window !== "undefined") {
            const user = localStorage.getItem(REPORT_DATA_KEY_2);
            return user ? JSON.parse(user) : "";
        }
        return [];
    },
    setReportEmployee2: (user: TeacherDetails[]): void => {
        localStorage.setItem(REPORT_DATA_KEY_2, JSON.stringify(user || ""));
    },
};

export default LocalStorageService2;