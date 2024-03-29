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
						top-1/4
						left-1/4
							right-auto
							bottom-auto outline-none p-5 sm:px-10 sm:py-6 rounded-lg animate-fade-down ${className}`}
			style={{
				overlay: {
					backgroundColor: "rgba(0,0,0,0.5)",
				},
				content: {
					right: "auto",
					bottom: "auto",
					// marginRight: "-50%",
				},
			}}
		>
			{children}
		</Modal>
	);
}
