/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
;
import { ControlledDropdownProps } from './input/data';


export default function DropdownSelectionField({
	label, name, register, options,
}: ControlledDropdownProps) {
	return (
		<div className="form-control w-full">
			<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>
				{label}
			</label>
			<select id={name} name={name} className="select select-bordered" {...register(name)}>
				<option disabled selected value="-1">All</option>
				{options.map((op) => (
					<option value={op.value} className="capitalize">{op.label}</option>
				))}
			</select>
		</div>
	);
}
