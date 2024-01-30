import * as yup from "yup";

export const SubjectSchema = () => {
	return yup.object().shape({
		name: yup.string().required("Subjectname is required"),
		agenda: yup.string().required("Agenda is required"),
		objectives: yup.string().required("Objectives is required"),
		participants: yup.string().required("Participants is required"),
		isArchived: yup.bool(),
	});
};
