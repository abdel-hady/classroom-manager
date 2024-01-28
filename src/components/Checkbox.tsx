import { forwardRef, useRef } from "react";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
	indeterminate?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
	({ ...rest }, ref) => {
		const defaultRef = useRef<HTMLInputElement>(null);
		const resolvedRef = ref || defaultRef;
		return (
			<input
				type="checkbox"
				ref={resolvedRef}
				{...rest}
				className="accent-red-500 w-4 h-4"
			/>
		);
	}
);
