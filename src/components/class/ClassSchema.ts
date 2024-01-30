import * as yup from "yup";

export const ClassSchema = () => {
	return yup.object().shape({
		className: yup.string().required("Class name is required"),
		subject: yup.string().required("Subject is required"),
		date: yup.string().required("Date is required"),
		from: yup.string().required("Start time  is required"),
		to: yup.string().required("End time is required"),
		isArchived: yup.bool(),
		teacher: yup.string(),
	});
};
