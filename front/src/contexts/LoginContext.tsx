import { AxiosError } from "axios";
import { ChildrenPropsModel } from "models/contexts/ContextModels";
import { LoginData } from "models/requests/LoginRequest";
import React from "react";
import { checkUserRoleService, loginService } from "services/Services";
import Loading from "views/Loading";
interface LoginContextProps {
	login: (data: LoginData) => void;
	logout: () => void;
	isAdmin: boolean;
	isLoggedIn: boolean;
	token: string;
	loading: boolean;
}

const LoginContext = React.createContext<LoginContextProps>({
	isLoggedIn: false,
	isAdmin: false,
	login: () => {},
	logout: () => {},
	token: "",
	loading: false,
});

const LoginContextProvider: React.FC<ChildrenPropsModel> = ({ children }) => {
	const [loading, setLoading] = React.useState<boolean>(true);
	const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);
	const [token, setToken] = React.useState<string>("");
	const [isAdmin, setAdmin] = React.useState<boolean>(false);

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

	const checkUserRole = async () => {
		try{
			const response = await checkUserRoleService(token);
			setAdmin(response.data);
		} catch (error) {
			console.log(error)
		}
	}

	React.useEffect(() => {
		getItemFromStorage();
		checkUserRole();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [token]);

	const login = async (data: LoginData) => {
		try {
			const res = await loginService(data);
			const resToken = res.data.token;
			if(resToken){
				localStorage.setItem("userToken", JSON.stringify(resToken));
				setToken(resToken);
			}
		} catch (error) {
			if(error instanceof AxiosError)
				throw error.response?.data;	
			else
				throw "Ocorreu um erro inesperado ao fazer o login. Tente novamente.";
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
			value={{ login, logout, isLoggedIn, isAdmin, token, loading }}
		>
			{children}
		</LoginContext.Provider>
	);
};

export default LoginContext;
export { LoginContextProvider };
