import {
	useState,
	createContext,
	ReactNode,
	useEffect,
	useContext,
} from "react";
import { User } from "../util/types/Reports.type";
import LocalStorageService from "../local/LocalStorageService";

interface AuthContextType {
	user: User | null;
	login: (name: string) => void;
	logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
	user: null,
	login: () => { },
	logout: () => { },
});

interface AuthProviderProps {
	children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const { getUserName, setUserName } = LocalStorageService;
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		setUser(getUserName());
	}, []);

	const login = (name: string) => {
		const user: User = {
			name: name,
		};
		setUserName(user);
		setUser(user);
	};

	const logout = () => {
		localStorage.clear();
		setUser(null);
	};

	const value = { user, login, logout };

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => useContext(AuthContext);
