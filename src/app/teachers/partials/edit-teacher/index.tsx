import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import { LuFileEdit } from "react-icons/lu";
import { TeacherSchema } from "@/components/teacher/TeacherSchema";
import { TeacherDetails } from "@/util/types/Reports.type";
import ControlledTextField2 from "@/components/input/ControlledTextField2";
import ActionBtn from "@/components/common/ActionBtn";

interface Props {
    initialData: TeacherDetails;
    onUpdate: (data: TeacherDetails) => void;
}
export default function EditReport({ initialData, onUpdate }: Props) {
    const { t } = useTranslation();
    const schema = TeacherSchema(t);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TeacherDetails>({
        defaultValues: initialData,
        resolver: yupResolver<TeacherDetails>(schema),
    });

    const onSubmit = (data: TeacherDetails) => {
        onUpdate(data);
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-5">
                <div className="w-full flex flex-col md:flex-row gap-5">
                    <ControlledTextField2
                        id="teacherName"
                        label={t("teacherName")}
                        placeholder={t("Class Name")}
                        type="text"
                        name="teacherName"
                        register={register}
                        error={errors.teacherName?.message ? errors.teacherName?.message : undefined}
                        className="w-full md:w-[50%]"
                    />
                    <ControlledTextField2
                        id="major"
                        label={t("major")}
                        placeholder={t("major")}
                        type="text"
                        name="major"
                        register={register}
                        error={
                            errors.major?.message ? errors.major?.message : undefined
                        }
                        className="w-full md:w-[50%]"
                    />
                </div>
                <div className="w-full flex flex-col md:flex-row gap-5">
                    <ControlledTextField2
                        id="experience"
                        label={t("experience")}
                        placeholder={t("experience")}
                        type="text"
                        name="experience"
                        register={register}
                        error={
                            errors.experience?.message ? errors.experience?.message : undefined
                        }
                        className="w-full md:w-[50%]"
                    />
                    <ControlledTextField2
                        id="address"
                        label={t("address")}
                        placeholder={t("address")}
                        type="text"
                        name="address"
                        register={register}
                        error={
                            errors.address?.message ? errors.address?.message : undefined
                        }
                        className="w-full md:w-[50%]"
                    />
                </div>
            </div>
            <div className="flex flex-row gap-5 justify-between mt-4">
                <ActionBtn type="submit" className="bg-yellow-300" text={t("Edit")}>
                    <LuFileEdit
                        size={24}
                        className="theme-icon dark:text-white transform transition-all duration-500 ease-in-out cursor-pointer hover:scale-110"
                    />
                </ActionBtn>
            </div>
        </form>
    );
}
