import { ChildrenPropsModel } from "models/contexts/ContextModels";
import React from "react";

interface LoginContextProps {
    login: (email: string) => void;
    logout: () => void;
    isLoggedIn: boolean;
    user: string;
}

const LoginContext = React.createContext<LoginContextProps>({
    isLoggedIn: false,
    login: () => {},
    logout: () => {},
    user: "",
})

const LoginContextProvider: React.FC<ChildrenPropsModel> = ({children}) => {

    const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);
    const [user, setUser] = React.useState<string>("");
    React.useEffect(() => {
        const userEmail = localStorage.getItem("user");
        if(userEmail){
            setUser(userEmail);
            setIsLoggedIn(true);
        }
    }, [isLoggedIn])

    const login = (email: string) => {
        setIsLoggedIn(true);
        localStorage.setItem("user",email);
    }

    const logout = () => {
        localStorage.removeItem("user");
    }

    return (
        <LoginContext.Provider value={{login, logout, isLoggedIn, user}} >
            {children}
        </LoginContext.Provider>
    )
} 

export default LoginContext
export {LoginContextProvider}