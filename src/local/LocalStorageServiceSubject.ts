import { SubjectDetails } from "../util/types/Entity.type";

const SUBJECT_DATA_KEY: string = "subjectDetails";

const LocalStorageServiceSubject = {

    getSubject: (): SubjectDetails[] => {
        if (typeof window !== "undefined") {
            const user = localStorage.getItem(SUBJECT_DATA_KEY);
            return user ? JSON.parse(user) : "";
        }
        return [];
    },
    setSubject: (user: SubjectDetails[]): void => {
        localStorage.setItem(SUBJECT_DATA_KEY, JSON.stringify(user || ""));
    },
};

export default LocalStorageServiceSubject;