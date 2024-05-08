import Button from "components/Button";
import Error from "components/Error";
import Input from "components/Input";
import Link from "components/Link";
import Title from "components/Title";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { forgotPasswordService } from "services/Services";

export interface ForgotPasswordModel {
    email:string;
}

const ForgotPassword = () => {

    const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [emailSent, setEmailSent] = React.useState<boolean>(false);

	const {control, handleSubmit, formState:{errors}} = useForm<ForgotPasswordModel>({
        defaultValues:{
            email:""
        }
    });

    const onSubmit: SubmitHandler<ForgotPasswordModel> = async (data) => {
        setIsLoading(true);
        try{
            const response = await forgotPasswordService(data);
            if(response.status === 200){
                setIsLoading(false);
				setEmailSent(true);
				localStorage.setItem("forgotPasswordEmail", data.email);
            }
        } catch (error){
            console.log(error);
            setIsLoading(true);
        }
    }

	return (
		<main className="flex items-center justify-center h-screen text-primaryBlack">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className=" rounded-lg w-[80%] md:w-2/3 lg:w-1/3 xl:w-1/4 h-fit flex flex-col items-center gap-y-6"
			>
				{!emailSent ? (
					<>
					<Title black bold message="Recuperação de senha" center fullWidth />
					<Controller
							name="email"
							control={control}
							defaultValue=""
							rules={{
								required: {
									value: true,
									message: "Campo obrigatório",
								},
								pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
							}}
							render={({ field: { name, value, onChange } }) => (
								<>
									<Input
										id={name}
										label="Insira seu email"
										type="text"
										placeholder="E-Mail"
										hasText
										height={40}
										value={value}
										onChange={onChange}
									/>
									<Error>
										{errors.email &&
											(errors.email.type == "required"
												? errors.email.message
												: "Email inválido")}
									</Error>
								</>
							)}
						></Controller>
						<Button
							onlyBorder={false}
							small={false}
							fullWidth
							loading={isLoading}
							disabled={isLoading}
							type="submit"
						>
							Enviar
						</Button>
					</>
				) : (
					<div className="flex flex-col justify-center items-center gap-y-4">
						<p>Email enviado, verifique sua caixa de entrada.</p>
						<Link to="/login" bgPrimary onlyBorder={false}>
							Clique aqui para refazer o Login
						</Link>
					</div>
				)}
            </form>
		</main>
	);
};

export default ForgotPassword;
