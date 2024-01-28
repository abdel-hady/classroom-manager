export interface ReportData {
	date: string;
	project: string;
	task: string;
	taskDescription: string | undefined;
	from: string | undefined;
	to: string | undefined;
	employeeName?: string;
	isExtra: boolean | undefined;
}
export interface User {
	name: string;
}

export interface ReportNameDataTypes {
	name: string;
}
