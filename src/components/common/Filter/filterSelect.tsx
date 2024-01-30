import React, { ChangeEvent } from 'react';

interface FilterSelectProps {
    value: string;
    options: { value: string; label: string }[];
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const FilterSelect: React.FC<FilterSelectProps> = ({ value, options, onChange }) => {
    return (
        <select value={value} onChange={onChange} className='w-64 text-gray-500 p-2.5 rounded-lg border border-gray-300 focus:border-[#117578] focus:outline-none'>
            {options.map((option) => (
                <option key={option.value} value={option.value} className="capitalize">
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export default FilterSelect;
