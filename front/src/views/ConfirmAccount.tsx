import { AxiosError } from "axios";
import Link from "components/Link";
import React from "react";
import { useLocation } from "react-router-dom";
import { confirmAccountService } from "services/Services";

export interface UserConfirmAccount {
    email: string;
    emailToken: string;
}

const ConfirmAccount = () => {

    const [message, setMessage] = React.useState<string>("");
    const [loginButtonVisible, setLoginButtonVisible] = React.useState<boolean>(false);

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const userEmail = params.get("email");
    const userCode = params.get("code");


    const confirmAccount = async () => {
        if(userEmail && userCode ){
            try{
                const data: UserConfirmAccount = {
                    emailToken: userCode.replace(" ","+"),
                    email: userEmail
                }
                const response = await confirmAccountService(data);
                if(response.status === 200){
                    setMessage(response.data);
                    setLoginButtonVisible(true);
                }
            } catch (err) {
                if(typeof err === 'string'){
                    setMessage(err);

                }
                else if (err instanceof AxiosError){
                    setMessage(err.response?.data);
                    if(err.response?.data == "Usuário já possui a conta confirmada."){
                        setLoginButtonVisible(true);
                    }
                }
            }
        }
    }

    React.useEffect(() => {
        confirmAccount();
    }, [])

    return (
		<>
			<main className="flex flex-col gap-y-4 bg-newWhite p-6 rounded-xl shadow items-center justify-center h-screen text-primaryBlack">
                <p>
                    {message && message}
                </p>
                {loginButtonVisible && (
                    <Link to="/login" onlyBorder={false} bgPrimary>
                        Clique aqui para fazer o login.
                    </Link>
                )}
            </main>
		</>
	);
};

export default ConfirmAccount;
