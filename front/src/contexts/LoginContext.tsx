import { ChildrenPropsModel } from "models/contexts/ContextModels";
import { LoginData } from "models/requests/LoginRequest";
import React from "react";
import { loginService } from "services/Services";
import Loading from "views/Loading";
interface LoginContextProps {
	login: (data: LoginData) => void;
	logout: () => void;
	isLoggedIn: boolean;
	token: string;
	loading: boolean;
}

const LoginContext = React.createContext<LoginContextProps>({
	isLoggedIn: false,
	login: () => {},
	logout: () => {},
	token: "",
	loading: false,
});

const LoginContextProvider: React.FC<ChildrenPropsModel> = ({ children }) => {
	const [loading, setLoading] = React.useState<boolean>(true);
	const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);
	const [token, setToken] = React.useState<string>("");

	const getItemFromStorage = () => {
		try {
			const token = localStorage.getItem("userToken");

			if (token) {
				setToken(JSON.parse(token));
				setIsLoggedIn(true);
			}
		} catch (error) {
			console.error("Erro ao obter item do armazenamento:", error);
		} finally {
			setLoading(false);
		}
	};

	React.useEffect(() => {
		getItemFromStorage();
	}, []);

	const login = async (data: LoginData) => {
		try {
			const res = await loginService(data);
			localStorage.setItem("userToken", JSON.stringify(res.data.token));
		} catch (error) {
			throw new Error();
		}
	};

	const logout = () => {
		localStorage.removeItem("userToken");
		setIsLoggedIn(false);
	};

	if (loading) {
		return <Loading big />;
	}

	return (
		<LoginContext.Provider
			value={{ login, logout, isLoggedIn, token, loading }}
		>
			{children}
		</LoginContext.Provider>
	);
};

export default LoginContext;
export { LoginContextProvider };
