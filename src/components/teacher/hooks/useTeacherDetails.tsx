import { TeacherDetails } from "@/util/types/Entity.type";
import { useState } from "react";

export default function useTeacherDetails() {
	const [state, setState] = useState<boolean>(false);
	const [stateAction, setStateAction] = useState<TeacherDetails | null>(null);
	return { state, setState, stateAction, setStateAction };
}
