/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { ControlledDropdownProps } from '../input/data';

export default function SelectDropdown({
    label, name, register, errors, options,
}: ControlledDropdownProps) {
    return (
        <div className="form-control relative w-full md:w-[50%]">
            <select id={name} name={name}
                className={`select select-bordered block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-400 bg-transparent rounded-lg border-gray-300 border-2 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 ${errors
                    ? "dark:border-red-500 dark:focus:border-red-500 peer-focus:dark:text-red-500"
                    : ""
                    }`}
                {...register(name)}>
                <option disabled selected value="-1">pick one</option>

                {options.map((op) => (
                    <option value={op.value} className="capitalize">{op.label}</option>
                ))}
            </select>
            <label className={`bg-white absolute text-sm text-gray-500 py-1 dark:text-gray-600 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[1] px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-0 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 ${errors ? "dark:border-red-500 peer-focus:dark:text-red-500" : ""
                }`}
                htmlFor={name}>
                {name}
            </label>
            {errors && <p className="text-red-600 mt-1">{errors}</p>}
        </div>
    );
}
