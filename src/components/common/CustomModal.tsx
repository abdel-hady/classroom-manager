import React from "react";
import Modal from "react-modal";

interface CustomModalProps {
	isOpen: boolean;
	onRequestClose: () => void;
	contentLabel: string;
	children: React.ReactNode;
	className?: string;
}

export function CustomModal({
	isOpen,
	onRequestClose,
	contentLabel,
	children,
	className,
}: CustomModalProps) {
	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			contentLabel={contentLabel}
			ariaHideApp={false}
			className={`absolute 
                        bg-white
						 top-1/2
							left-1/2
							right-auto
							bottom-auto
							-translate-x-1/2 outline-none -translate-y-1/2 p-5 sm:px-10 sm:py-6 rounded-lg ${className}`}
			style={{
				overlay: {
					backgroundColor: "rgba(0,0,0,0.5)",
				},
				content: {
					top: "50%",
					left: "50%",
					right: "auto",
					bottom: "auto",
					marginRight: "-50%",
					transform: "translate(-50%, -50%)",
				},
			}}
		>
			{children}
		</Modal>
	);
}
