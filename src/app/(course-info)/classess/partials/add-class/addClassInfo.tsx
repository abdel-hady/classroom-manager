import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import { ClassDetails } from "../../../../../util/types/Entity.type";
import ActionBtn from "../../../../../components/common/ActionBtn";
import { IoMdAddCircle } from "react-icons/io";
import { ClassSchema } from "@/components/class/ClassSchema";
import ControlledTextField from "@/components/class/ControlledTextField";
import { useState } from "react";
import SelectDropdown from "@/components/common/SelectDropdown";

type AsyncDefaultValues = {
	date?: string;
	className?: string;
	teacher?: string;
	subject?: string;
	from?: string;
	to?: string;
	isArchived?: boolean;
};
interface Props {
	initialData?: AsyncDefaultValues;
	onAddClass: (data: ClassDetails) => void;
	title: string;
}
export default function AddClass({ onAddClass, initialData, title }: Props) {
	const { t } = useTranslation();
	const schema = ClassSchema(t);
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<ClassDetails>({
		defaultValues: initialData,
		resolver: yupResolver<ClassDetails>(schema),
	});

	// Get the teacher options from local storage
	const [teacherOptions] = useState(() => {
		const teacherDeatails = localStorage.getItem("teacherDetails");
		return teacherDeatails ? JSON.parse(teacherDeatails) : [];
	});
	const [subjectOptions] = useState(() => {
		const subjectDeatails = localStorage.getItem("subjectDetails");
		return subjectDeatails ? JSON.parse(subjectDeatails) : [];
	});

	const onSubmit = (data: ClassDetails) => {
		reset({});
		onAddClass(data);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="flex flex-col gap-5">
				<div className="text-gray-500 bold text-center text-2xl">{title}</div>
				<div className="w-full flex flex-col md:flex-row gap-5">
					<ControlledTextField
						id="className"
						label={t("className")}
						placeholder={t("Class Name")}
						type="text"
						name="className"
						register={register}
						error={errors.className?.message ? errors.className?.message : undefined}
						className="w-full md:w-[50%]"
					/>
					<SelectDropdown
						name="teacher"
						label='teacherName'
						errors={errors.teacher?.message ? errors.teacher?.message : undefined}
						register={register}
						options={teacherOptions}
					/>
				</div>
				<div className="w-full flex flex-col md:flex-row gap-5">
					<SelectDropdown
						name="subject"
						label='subjectName'
						errors={errors.subject?.message ? errors.subject?.message : undefined}
						register={register}
						options={subjectOptions}
					/>
					<ControlledTextField
						id="date"
						label={t("date")}
						placeholder={t("date")}
						type="date"
						name="date"
						register={register}
						error={errors.date?.message ? errors.date?.message : undefined}
						className="w-full md:w-[50%]"
					/>
				</div>
				<div className="flex gap-5">
					<ControlledTextField
						id="from"
						label={t("from")}
						placeholder={t("from")}
						type="time"
						name="from"
						register={register}
						error={errors.from?.message ? errors.from?.message : undefined}
						className="w-[50%]"
					/>
					<ControlledTextField
						id="to"
						label={t("to")}
						placeholder={t("to")}
						type="time"
						name="to"
						register={register}
						error={errors.from?.message ? errors.from?.message : undefined}
						className="w-[50%]"
					/>
				</div>
			</div>
			<div className="relative flex justify-start rounded-lg">
				<label
					htmlFor="isArchived"
					className="inline-flex items-center cursor-pointer"
				>
					<input
						type="checkbox"
						id="isArchived"
						{...register("isArchived")}
						className="h-4 w-4 accent-red-500 cursor-pointer"
					/>
					<span className="ml-2 text-gray-700">{t("archived_class")}</span>
				</label>
			</div>
			<div className="flex flex-row gap-5 justify-between mt-4">
				<ActionBtn type="submit" className="" text={t("Add")}>
					<IoMdAddCircle
						size={24}
						className="theme-icon dark:text-white transform transition-all duration-500 ease-in-out cursor-pointer hover:scale-110"
					/>
				</ActionBtn>
			</div>
		</form>
	);
}
