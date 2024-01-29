import * as yup from "yup";

export const SubjectSchema = (t: (key: string) => string) => {
	return yup.object().shape({
		subjectName: yup.string().required(t("subjectname_is_required")),
		agenda: yup.string().required(t("agenda_is_required")),
		objectives: yup.string().required(t("objectives_is_required")),
		participants: yup.string().required(t("participants_is_required")),
		isArchived: yup.bool(),
	});
};
