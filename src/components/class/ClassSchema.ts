import * as yup from "yup";

export const ClassSchema = (t: (key: string) => string) => {
	return yup.object().shape({
		className: yup.string().required(t("classname_is_required")),
		subject: yup.string().required(t("subject_is_required")),
		date: yup.string().required(t("date_is_required")),
		from: yup.string().required(t("start_time_is_required")),
		to: yup.string().required(t("end_time_is_required")),
		isArchived: yup.bool(),
		teacher: yup.string(),
	});
};
