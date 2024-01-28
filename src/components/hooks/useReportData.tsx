import { ClassDetails } from "@/util/types/Reports.type";
import { useState } from "react";

export default function useReportData() {
	const [state, setState] = useState<boolean>(false);
	const [stateAction, setStateAction] = useState<ClassDetails | null>(null);
	return { state, setState, stateAction, setStateAction };
}
