import React from "react";
import { TeacherDetails } from "../../util/types/Reports.type";
import { UseFormRegister } from "react-hook-form";

interface ControlledTextFieldProps {
    id: string;
    label: string;
    type: "date" | "text" | "time";
    placeholder?: string;
    error?: string;
    required?: boolean;
    register: UseFormRegister<TeacherDetails>;
    name:
    | "teacherName"
    | "major"
    | "address"
    | "experience"
    | "isArchived"
    className?: string;
}

const ControlledTextField2: React.FC<ControlledTextFieldProps> = ({
    id,
    label,
    type,
    placeholder,
    error,
    required,
    register,
    name,
    className,
}) => {
    return (
        <div className={`relative ${className}`}>
            <input
                type={type}
                id={id}
                placeholder={placeholder}
                required={required}
                {...register(name)}
                className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-gray-300 appearance-none border-2 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${error
                    ? "dark:border-red-500 dark:focus:border-red-500 peer-focus:dark:text-red-500"
                    : ""
                    }`}
            />
            <label
                htmlFor={id}
                className={`bg-white absolute text-sm text-gray-500 py-1 dark:text-gray-600 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[1] px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-0 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 ${error ? "dark:border-red-500 peer-focus:dark:text-red-500" : ""
                    }`}
            >
                {label}
            </label>
            {error && (
                <span className="pt-1 flex justify-start text-red-500 text-sm">
                    {error}
                </span>
            )}
        </div>
    );
};

export default ControlledTextField2;
