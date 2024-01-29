import { ClassDetails } from "../util/types/Entity.type";

const REMEMBER_ME_KEY: string = "rememberMe";
const CLASS_DATA_KEY: string = "classDetails";

const LocalStorageServiceClass = {

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

	getClass: (): ClassDetails[] => {
		if (typeof window !== "undefined") {
			const user = localStorage.getItem(CLASS_DATA_KEY);
			return user ? JSON.parse(user) : "";
		}
		return [];
	},

	setClass: (user: ClassDetails[]): void => {
		localStorage.setItem(CLASS_DATA_KEY, JSON.stringify(user || ""));
	},
};

export default LocalStorageServiceClass;
