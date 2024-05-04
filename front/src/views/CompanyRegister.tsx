import Button from "components/Button";
import Title from "components/Title";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { CustomFile } from "./MovieRegister";
import Dropzone from "react-dropzone";
import Error from "components/Error";
import Input from "components/Input";
import { createCompanyService } from "services/Services";
import LoginContext from "contexts/LoginContext";
import { AxiosError } from "axios";

interface CompanyRegister {
	logo: Blob | string;
	name: string;
	originalCountry: string;
}

const CompanyRegister = () => {
	const { token } = React.useContext(LoginContext);
	const [loading, setLoading] = React.useState<boolean>(false);
	const [errorMessage, setErrorMessage] = React.useState<string>("");
	const [logo, setLogo] = React.useState<CustomFile[]>([]);

	const {
		control,
		formState: { errors },
		handleSubmit,
		setValue,
	} = useForm<CompanyRegister>({
		defaultValues: {
			logo: undefined,
			name: "",
			originalCountry: "",
		},
	});

	const onSubmit: SubmitHandler<CompanyRegister> = async (data) => {
		const formData = new FormData();
		formData.append("logo", data.logo);
		formData.append("name", data.name);
		formData.append("originalCountry", data.originalCountry);
		console.log(formData);

		setLoading(true);
		try {
			await createCompanyService(formData, token);
			setLoading(false);
		} catch (err) {
			if (err instanceof AxiosError) setErrorMessage(err.response?.data);
			setLoading(false);
		}
	};

	return (
		<>
			<main className="min-h-screen bg-secondary relative overflow-hidden -z-0">
				<div className="-left-[15%] bg-newWhite absolute h-[1400px] w-full -top-full rounded-full -z-10 shadow-sm"></div>
				<section className="z-50 flex flex-col gap-y-4 pt-[120px] pb-[100px] w-full px-6 md:w-[85%] md:px-0 items-center mx-auto text-primaryBlack">
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="h-auto bg-newWhite rounded-xl shadow p-6 flex flex-col gap-y-4 items-center"
						action=""
					>
						<Title
							black
							bold
							center={false}
							message="Cadastro de produtoras"
              />
              {errorMessage && errorMessage && (
                <Error>{errorMessage}</Error>
              )}
						<div>
							<Controller
								control={control}
								name="logo"
								rules={{
									required: {
										message: "Campo obrigatório",
										value: true,
									},
								}}
								render={({ field: { name } }) => (
									<div className="flex flex-col gap-y-1">
										<Dropzone
											onDrop={(files) => {
												setLogo(
													files.map(
														(file) =>
															Object.assign(
																file,
																{
																	preview:
																		URL.createObjectURL(
																			file
																		),
																}
															),
														setValue(
															"logo",
															files[0]
														)
													)
												);
											}}
											maxFiles={1}
											multiple={false}
										>
											{({
												getRootProps,
												getInputProps,
												isDragActive,
												isFocused,
											}) => (
												<div className="flex flex-col gap-y-1">
													<label htmlFor={name}>
														Imagem da Logo*
													</label>
													<div
														className={`${
															isFocused &&
															"border-tertiary"
														} hover:border-tertiary cursor-pointer rounded-xl p-4 border-2 border-dashed text-sm text-bodyColor`}
														{...getRootProps()}
													>
														<input
															id={name}
															{...getInputProps()}
														/>
														{isDragActive ? (
															<p>
																Solte a imagem
																aqui...
															</p>
														) : (
															<p>
																Arraste e solte
																uma imagem aqui
																ou clique para
																buscar...
															</p>
														)}
													</div>
													{logo.length > 0 ? (
														<div className="relative w-[150px]">
															<img
																className="w-full h-[150px] rounded-xl"
																onLoad={() =>
																	URL.revokeObjectURL(
																		logo[0]
																			.preview
																	)
																}
																src={
																	logo[0]
																		.preview
																}
															/>
															<button
																onClick={() => {
																	setLogo([]);
																	setValue(
																		"logo",
																		""
																	);
																}}
																className="absolute top-1 right-2 text-newWhite font-bold"
															>
																x
															</button>
														</div>
													) : null}
												</div>
											)}
										</Dropzone>
										<Error>
											{errors.logo &&
												errors.logo.type ===
													"required" &&
												errors.logo.message}
										</Error>
									</div>
								)}
							/>
							<Controller
								control={control}
								name="name"
								rules={{
									required: {
										message: "Campo obrigatório",
										value: true,
									},
									maxLength: {
										message: "Máximo de 50 caracteres",
										value: 50,
									},
								}}
								render={({
									field: { name, onChange, value },
								}) => (
									<div>
										<Input
											id={name}
											value={value}
											onChange={onChange}
											label="Nome*"
											placeholder="Digite o nome da produtora..."
										/>
										<Error>
											{errors.name &&
												errors.name.type ===
													"required" &&
												errors.name.message}
											{errors.name &&
												errors.name.type ===
													"maxLength" &&
												errors.name.message}
										</Error>
									</div>
								)}
							/>
							<Controller
								control={control}
								name="originalCountry"
								rules={{
									required: {
										message: "Campo obrigatório",
										value: true,
									},
									maxLength: {
										message: "Máximo de 50 caracteres",
										value: 50,
									},
								}}
								render={({
									field: { name, onChange, value },
								}) => (
									<div>
										<Input
											id={name}
											value={value}
											onChange={onChange}
											label="País*"
											placeholder="Digite o país de origem da produtora..."
										/>
										<Error>
											{errors.name &&
												errors.name.type ===
													"required" &&
												errors.name.message}
											{errors.name &&
												errors.name.type ===
													"maxLength" &&
												errors.name.message}
										</Error>
									</div>
								)}
							/>
						</div>
						<Button
							loading={loading}
							onlyBorder={false}
							small={false}
							type="submit"
						>
							Cadastrar
						</Button>
					</form>
				</section>
			</main>
		</>
	);
};

export default CompanyRegister;
