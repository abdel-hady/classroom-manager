import { SubjectDetails } from "@/util/types/Entity.type";
import { useState } from "react";

export default function useSubjectDetails() {
	const [state, setState] = useState<boolean>(false);
	const [stateAction, setStateAction] = useState<SubjectDetails | null>(null);
	return { state, setState, stateAction, setStateAction };
}
