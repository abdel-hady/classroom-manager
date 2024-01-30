import * as yup from "yup";

export const TeacherSchema = () => {
	return yup.object().shape({
		name: yup.string().required("Teacher name is required"),
		major: yup.string().required("Major is required"),
		experience: yup.string().required("Experience is required"),
		address: yup.string().required("address is required"),
		isArchived: yup.bool(),
	});
};
