import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import { LuFileEdit } from "react-icons/lu";
import ActionBtn from "@/components/common/ActionBtn";
import { SubjectDetails } from "@/util/types/Entity.type";
import { SubjectSchema } from "@/components/subject/SubjectSchema";
import ControlledTextField from "@/components/subject/ControlledTextField";

interface Props {
    initialData: SubjectDetails;
    onUpdate: (data: SubjectDetails) => void;
    title: string;
}
export default function EditSubjectInfo({ initialData, onUpdate, title }: Props) {
    const { t } = useTranslation();
    const schema = SubjectSchema(t);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SubjectDetails>({
        defaultValues: initialData,
        resolver: yupResolver<SubjectDetails>(schema),
    });

    const onSubmit = (data: SubjectDetails) => {
        onUpdate(data);
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-5">
                <div className="text-gray-500 bold text-center text-2xl">{title}</div>
                <div className="w-full flex flex-col md:flex-row gap-5">
                    <ControlledTextField
                        id="subjectName"
                        label={t("subjectName")}
                        placeholder={t("Subject Name")}
                        type="text"
                        name="name"
                        register={register}
                        error={errors.name?.message ? errors.name?.message : undefined}
                        className="w-full md:w-[50%]"
                    />
                    <ControlledTextField
                        id="agenda"
                        label={t("agenda")}
                        placeholder={t("agenda")}
                        type="text"
                        name="agenda"
                        register={register}
                        error={
                            errors.agenda?.message ? errors.agenda?.message : undefined
                        }
                        className="w-full md:w-[50%]"
                    />
                </div>
                <div className="w-full flex flex-col md:flex-row gap-5">
                    <ControlledTextField
                        id="participants"
                        label={t("participants")}
                        placeholder={t("participants")}
                        type="text"
                        name="participants"
                        register={register}
                        error={
                            errors.participants?.message ? errors.participants?.message : undefined
                        }
                        className="w-full md:w-[50%]"
                    />
                    <ControlledTextField
                        id="objectives"
                        label={t("objectives")}
                        placeholder={t("objectives")}
                        type="text"
                        name="objectives"
                        register={register}
                        error={
                            errors.objectives?.message ? errors.objectives?.message : undefined
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
