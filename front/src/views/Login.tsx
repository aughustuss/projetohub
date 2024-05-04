import React from "react";
import Input from "components/Input";
import { IoEye } from "react-icons/io5";
import LoginContext from "contexts/LoginContext";
import Title from "components/Title";
import Button from "components/Button";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Error from "components/Error";
import { LoginData } from "models/requests/LoginRequest";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
	const [isLoading, setLoading] = React.useState<boolean>(false);
	const [errorMessage, setErrorMessage] = React.useState<string>("");
	const { login } = React.useContext(LoginContext);
	const navigate = useNavigate();
	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<LoginData>({
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit: SubmitHandler<LoginData> = async (data) => {
		setLoading(true);
		try {
			await login(data);
			setErrorMessage("");
			setLoading(false);
			navigate("/account");
		} catch (err) {
			if(typeof err === "string" )
				setErrorMessage(err)
			setLoading(false);
		}
	};

	return (
		<main className="flex items-center justify-center h-screen">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className=" rounded-lg w-[80%] md:w-2/3 lg:w-1/3 xl:w-1/4 h-fit flex flex-col items-center gap-y-6"
			>
				<Title black bold message="Faça seu login" center fullWidth />
				<div className="w-full flex flex-col gap-y-3">
				{errorMessage && (
					<Error>{errorMessage}</Error>
				)}	
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
									label="Digite seu email"
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
					<Controller
						name="password"
						control={control}
						defaultValue=""
						rules={{
							required: {
								value: true,
								message: "Campo obrigatório",
							},
						}}
						render={({ field: { name, onChange, value } }) => (
							<>
								<Input
									id={name}
									onChange={onChange}
									value={value}
									password
									label="Digite sua senha"
									placeholder="Senha"
									icon={<IoEye />}
									height={40}
								/>
								<Error>
									{errors.password &&
										(errors.password.type == "required"
											? errors.password.message
											: "Senha inválida")}
								</Error>
							</>
						)}
					></Controller>
				</div>
				<div className="text-sm text-bodyColor gap-2 flex flex-row items-center flex-wrap">
					<span>Não possui uma conta?</span>
					<a
						href="/register"
						className="font-bold text-primaryBlack underline"
					>
						Clique aqui para criar uma!
					</a>
				</div>
				<Button
					onlyBorder={false}
					small={false}
					fullWidth
					loading={isLoading}
					disabled={isLoading}
					type="submit"
				>
					Login
				</Button>
			</form>
		</main>
	);
};

export default LoginPage;
