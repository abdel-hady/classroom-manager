import * as yup from "yup";

export const TeacherSchema = (t: (key: string) => string) => {
	return yup.object().shape({
		teacherName: yup.string().required(t("teachername_is_required")),
		major: yup.string().required(t("major_is_required")),
		experience: yup.string().required(t("experience_is_required")),
		address: yup.string().required(t("address_is_required")),
		isArchived: yup.bool(),
	});
};
