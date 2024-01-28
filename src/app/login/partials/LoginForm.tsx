import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { LoginSchema } from "./LoginSchema";
import ActionBtn from "@/components/common/ActionBtn";

interface LoginFormDataTypes {
	name: string;
	rememberMe?: boolean | undefined;
}
interface LoginFormProps {
	onSubmit: (data: LoginFormDataTypes) => void;
	defaultValues: LoginFormDataTypes;
}
export default function Login({ onSubmit, defaultValues }: LoginFormProps) {
	const { t } = useTranslation();
	const schema = LoginSchema(t);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormDataTypes>({
		resolver: yupResolver(schema),
		defaultValues,
	});

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="w-full flex flex-col gap-6 my-6"
		>
			<div className="relative rounded-lg">
				<input
					type="text"
					id="name"
					placeholder={t("name")}
					{...register("name")}
					className={`block bg-white px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-gray-300 appearance-none border-2 dark:border-gray-400 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${errors.name
						? "dark:border-red-500 dark:focus:border-red-500 peer-focus:dark:text-red-500"
						: ""
						}`}
				/>
				{errors.name && (
					<span className="pt-1 flex justify-start text-red-500 text-sm">
						{errors.name.message}
					</span>
				)}
			</div>
			<ActionBtn
				type="submit"
				className="w-full bg-[#FF7C34] hover:bg-[#117578]"
				text={t("login")}
			/>
			<div className="relative flex justify-start rounded-lg">
				<label
					htmlFor="remember_me"
					className="inline-flex items-center cursor-pointer"
				>
					<input
						type="checkbox"
						id="remember_me"
						{...register("rememberMe")}
						className="h-4 w-4 accent-[#FF7C34] cursor-pointer"
					/>
					<span className="ml-2 text-gray-700">{t("remember_me")}</span>
				</label>
			</div>
		</form>
	);
}
