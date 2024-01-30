import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IoMdAddCircle } from "react-icons/io";
import ActionBtn from "@/components/common/ActionBtn";
import { SubjectDetails } from "@/util/types/Entity.type";
import { SubjectSchema } from "@/components/subject/SubjectSchema";
import ControlledTextField from "@/components/subject/ControlledTextField";

type AsyncDefaultValues = {
    name?: string;
    agenda?: string;
    participants?: string;
    objectives?: string;
    isArchived?: boolean;
};

interface Props {
    initialData?: AsyncDefaultValues;
    onAddSubject: (data: SubjectDetails) => void;
    title: string;
}
export default function AddSubject({ onAddSubject, initialData, title }: Props) {
    const schema = SubjectSchema();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<SubjectDetails>({
        defaultValues: initialData,
        resolver: yupResolver<SubjectDetails>(schema),
    });

    const onSubmit = (data: SubjectDetails) => {
        reset({});
        onAddSubject(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-5">
                <div className="text-gray-500 bold text-center text-2xl">{title}</div>
                <div className="w-full flex flex-col md:flex-row gap-5">
                    <ControlledTextField
                        id="subjectName"
                        label={"subjectName"}
                        placeholder={"Subject Name"}
                        type="text"
                        name="name"
                        register={register}
                        error={errors.name?.message ? errors.name?.message : undefined}
                        className="w-full md:w-[50%]"
                    />
                    <ControlledTextField
                        id="agenda"
                        label={"agenda"}
                        placeholder={"agenda"}
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
                        label={"participants"}
                        placeholder={"participants"}
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
                        label={"objectives"}
                        placeholder={"objectives"}
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
            <div className="relative flex justify-start rounded-lg">
                <label
                    htmlFor="isArchived"
                    className="inline-flex items-center cursor-pointer"
                >
                    <input
                        type="checkbox"
                        id="isArchived"
                        {...register("isArchived")}
                        className="h-4 w-4 accent-secondaryColor cursor-pointer"
                    />
                    <span className="ml-2 text-gray-700">{"archived_class"}</span>
                </label>
            </div>
            <div className="flex flex-row gap-5 justify-between mt-4">
                <ActionBtn type="submit" className="bg-primaryColor hover:bg-secondaryColor" text={"Add"}>
                    <IoMdAddCircle
                        size={24}
                        className="theme-icon dark:text-white transform transition-all duration-500 ease-in-out cursor-pointer hover:scale-110"
                    />
                </ActionBtn>
            </div>
        </form>
    );
}
