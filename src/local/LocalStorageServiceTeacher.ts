import { TeacherDetails } from "../util/types/Entity.type";

const TEACHER_DATA_KEY: string = "teacherDetails";

const LocalStorageServiceTeacher = {

    getTeacher: (): TeacherDetails[] => {
        if (typeof window !== "undefined") {
            const user = localStorage.getItem(TEACHER_DATA_KEY);
            return user ? JSON.parse(user) : "";
        }
        return [];
    },
    setTeacher: (user: TeacherDetails[]): void => {
        localStorage.setItem(TEACHER_DATA_KEY, JSON.stringify(user || ""));
    },
};

export default LocalStorageServiceTeacher;