import React from "react";

interface ActionBtnProps {
	onClick?: () => void;
	className?: string;
	text?: string;
	type: "button" | "reset" | "submit" | undefined;
	children?: React.ReactNode;
}

const ActionBtn: React.FC<ActionBtnProps> = ({
	onClick,
	className,
	text,
	type,
	children,
}) => {
	const buttonStyles = `w-[180px] p-2 bg-[#117578] hover:bg-[#FF7C34] rounded-lg text-white text-xl flex flex-row justify-center items-center gap-2 ${className}`;

	return (
		<button type={type} onClick={onClick} className={buttonStyles}>
			{children}
			{text}
		</button>
	);
};

export default ActionBtn;
