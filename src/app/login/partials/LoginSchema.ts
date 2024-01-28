import * as yup from "yup";

export const LoginSchema = (t: (key: string) => string) => {
	return yup.object().shape({
		name: yup.string().required(t("name_is_required")),
		rememberMe: yup.boolean(),
	});
};
