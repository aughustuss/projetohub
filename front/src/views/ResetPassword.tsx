import Button from "components/Button";
import Error from "components/Error";
import Input from "components/Input";
import Link from "components/Link";
import Title from "components/Title";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { IoEye } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import { resetPasswordService } from "services/Services";

export interface ResetPasswordModel {
  resetPasswordToken:string;
  email:string;
  newPassword:string;
}

const ResetPassword = () => {
	const location = useLocation();
	const params = new URLSearchParams(location.search);
	const userEmail = params.get("email");
	const userCode = params.get("code");

  const [passwordReseted, setPasswordReseted] = React.useState<boolean>(false);
  const [isLoading, setLoading] = React.useState<boolean>(false);

  const {handleSubmit, control, formState:{errors}} = useForm<ResetPasswordModel>({
    defaultValues: {
      resetPasswordToken: "1",
      email: "1",
      newPassword: "",
    },
  })

  const onSubmit:SubmitHandler<ResetPasswordModel> = async (data) => {
    if(userEmail && userCode){
      console.log("aqui")
      setLoading(true);
      data.email = userEmail;
      data.resetPasswordToken = userCode;
      try{
        const response = await resetPasswordService(data);
        if(response.status === 200){
          setPasswordReseted(true);
          setLoading(false);
        }
      } catch (error){
        console.log(error);
        setLoading(false);
      }
    }
  }

	return (
    <>
      <main className="flex items-center justify-center h-screen text-primaryBlack">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" rounded-lg w-[80%] md:w-2/3 lg:w-1/3 xl:w-1/4 h-fit flex flex-col items-center gap-y-6"
        >
          {!passwordReseted ? (
            <>
            <Title black bold message="Redefinição de senha" center fullWidth />
              <Controller
                name="newPassword"
                control={control}
                defaultValue=""
                rules={{
                  required: {
                    value: true,
                    message: "Campo obrigatório",
                  },
                }}
                render={({ field: { name, value, onChange } }) => (
                  <>
                    <Input
                      id={name}
                      label="Insira sua nova senha"
                      withIcon
                      icon={<IoEye />}
                      password
                      placeholder="Nova senha"
                      hasText
                      height={40}
                      value={value}
                      onChange={onChange}
                    />
                    <Error>
                      {errors.newPassword &&
                        (errors.newPassword.type == "required"
                          ? errors.newPassword.message
                          : "Digite sua senha.")}
                    </Error>
                  </>
                )}
              />
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
              <p>Senha redefinida.</p>
              <Link to="/login" bgPrimary onlyBorder={false}>
                Clique aqui para refazer o Login
              </Link>
					</div>
          )}
        </form>
      </main>
    </>
  )
};

export default ResetPassword;
