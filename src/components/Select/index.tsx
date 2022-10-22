import React from 'react';

const Select: React.FC<{
    name: string;
    value: string;
    options: {label: string; value: string}[];
    onChange: (e: string) => void;
}> = ({name, value, options, onChange}) => {
    return (
        <select value={value} onChange={(e) => onChange(e.target.value)}>
            <option value={''} disabled>
                {name}
            </option>
            {options.map((option, i) => (
                <option key={i} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export default Select;
