export interface ClassDetails {
	className: string;
	teacher: string;
	subject: string;
	date: string;
	from?: string | undefined;
	to?: string | undefined;
	isArchived: boolean;
}
export interface TeacherDetails {
	teacherName: string;
	address: string;
	major: string;
	experience: string;
	isArchived: boolean;
}
export interface SubjectDetails {
	subjectName: string;
	agenda: string;
	participants: string;
	objectives: string;
	isArchived: boolean;
}
