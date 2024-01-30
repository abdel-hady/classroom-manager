import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IoMdAddCircle } from "react-icons/io";
import ActionBtn from "@/components/common/ActionBtn";
import { TeacherSchema } from "@/components/teacher/TeacherSchema";
import { TeacherDetails } from "@/util/types/Entity.type";
import ControlledTextField from "@/components/teacher/ControlledTextField";

type AsyncDefaultValues = {
    experience?: string;
    teacherName?: string;
    major?: string;
    address?: string;
    isArchived: boolean;
};
interface Props {
    initialData?: AsyncDefaultValues;
    onAddTeacher: (data: TeacherDetails) => void;
    title: string;
}
export default function AddTeacher({ onAddTeacher, initialData, title }: Props) {
    const schema = TeacherSchema();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<TeacherDetails>({
        defaultValues: initialData,
        resolver: yupResolver<TeacherDetails>(schema),
    });

    const onSubmit = (data: TeacherDetails) => {
        reset({});
        onAddTeacher(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-5">
                <div className="text-gray-500 bold text-center text-2xl">{title}</div>
                <div className="w-full flex flex-col md:flex-row gap-5">
                    <ControlledTextField
                        id="teacherName"
                        label={"teacherName"}
                        placeholder={"Teacher Name"}
                        type="text"
                        name="teacherName"
                        register={register}
                        error={errors.teacherName?.message ? errors.teacherName?.message : undefined}
                        className="w-full md:w-[50%]"
                    />
                    <ControlledTextField
                        id="major"
                        label={"major"}
                        placeholder={"major"}
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
                    <ControlledTextField
                        id="address"
                        label={"address"}
                        placeholder={"address"}
                        type="text"
                        name="address"
                        register={register}
                        error={
                            errors.address?.message ? errors.address?.message : undefined
                        }
                        className="w-full md:w-[50%]"
                    />
                    <ControlledTextField
                        id="experience"
                        label={"experience"}
                        placeholder={"experience"}
                        type="text"
                        name="experience"
                        register={register}
                        error={
                            errors.experience?.message ? errors.experience?.message : undefined
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
                        className="h-4 w-4 accent-red-500 cursor-pointer"
                    />
                    <span className="ml-2 text-gray-700">Archived class</span>
                </label>
            </div>
            <div className="flex flex-row gap-5 justify-between mt-4">
                <ActionBtn type="submit" className="" text={"Add"}>
                    <IoMdAddCircle
                        size={24}
                        className="theme-icon dark:text-white transform transition-all duration-500 ease-in-out cursor-pointer hover:scale-110"
                    />
                </ActionBtn>
            </div>
        </form>
    );
}
