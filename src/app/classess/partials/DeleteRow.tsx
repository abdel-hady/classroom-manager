import ActionBtn from "../../../components/common/ActionBtn";
import { Dispatch, SetStateAction } from "react";

interface DeleteRowProps {
	setIsDeleting: Dispatch<SetStateAction<boolean>>;
	handleDeleteClick: () => void;
}

export default function DeleteRow({
	setIsDeleting,
	handleDeleteClick,
}: DeleteRowProps) {
	return (
		<div className="mt-2 left-1/2">
			<p className="text-xl text-gray-500">
				Are you sure you want to delete this row
			</p>

			<div className="w-full flex justify-end gap-5 mt-5">
				<ActionBtn
					type="button"
					text="hide"
					onClick={() => setIsDeleting(false)}
					className="w-[25%] bg-gray-500 hover:bg-gray-600"
				/>
				<ActionBtn
					type="button"
					text="delete"
					onClick={handleDeleteClick}
					className="w-[25%] bg-red-500 hover:bg-red-600"
				/>
			</div>
		</div>
	);
}
