import { ClassDetails } from "@/util/types/Entity.type";
import { useState } from "react";

export default function useClassDetails() {
	const [state, setState] = useState<boolean>(false);
	const [stateAction, setStateAction] = useState<ClassDetails | null>(null);
	return { state, setState, stateAction, setStateAction };
}
