import { useEffect, useState } from "react";

export function useWindowResize() {
	const [isSmallScreen, setIsSmallScreen] = useState(window?.innerWidth < 640);

	useEffect(() => {
		const handleResize = () => {
			if (typeof window !== 'undefined')
				setIsSmallScreen(window?.innerWidth < 640);
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return isSmallScreen;
}
