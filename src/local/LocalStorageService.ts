import { ClassDetails, User } from "../util/types/Reports.type";

const EMPLOYEE_NAME_KEY: string = "employeeName";
const REMEMBER_ME_KEY: string = "rememberMe";
const REPORT_DATA_KEY: string = "classDetails";
const USER_KEY: string = "user";

const LocalStorageService = {
	getEmployeeName: (): string => {
		if (typeof window !== 'undefined') {
			return localStorage.getItem(EMPLOYEE_NAME_KEY) || "";
		}
		return "";
	},
	setEmployeeName: (name: string): void => {
		if (typeof window !== 'undefined') {
			localStorage.setItem(EMPLOYEE_NAME_KEY, name || "");
		}
	},
	removeEmployeeName: (): void => {
		localStorage.removeItem(EMPLOYEE_NAME_KEY);
	},
	getRememberMe: (): boolean => {
		if (typeof window !== 'undefined') {
			const rememberMe = localStorage.getItem(REMEMBER_ME_KEY);
			return rememberMe ? JSON.parse(rememberMe) : false;
		}
		return false;
	},
	setRememberMe: (rememberMe: boolean): void => {
		if (typeof window !== 'undefined') {
			localStorage.setItem(REMEMBER_ME_KEY, JSON.stringify(rememberMe));
		}
	},
	getUserName: (): User => {
		const user = localStorage.getItem(USER_KEY);
		return user ? JSON.parse(user) : "";
	},
	setUserName: (user: User): void => {
		localStorage.setItem(USER_KEY, JSON.stringify(user || ""));
	},
	getReportEmployee: (): ClassDetails[] => {
		if (typeof window !== "undefined") {
			const user = localStorage.getItem(REPORT_DATA_KEY);
			return user ? JSON.parse(user) : "";
		}
		return [];
	},
	setReportEmployee: (user: ClassDetails[]): void => {
		localStorage.setItem(REPORT_DATA_KEY, JSON.stringify(user || ""));
	},

};

export default LocalStorageService;
