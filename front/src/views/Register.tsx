import React from 'react';
import Input from '../components/Input';
import { IoEye } from 'react-icons/io5';
import Title from 'components/Title';
import Button from 'components/Button';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Error from 'components/Error';
import { registerUserService } from 'services/Services';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

export interface UserRegister {
  firstName: string;
  surName: string;
  nickName: string;
  email: string;
  password: string;
}

const Register: React.FC = () => {

  const [errorMessage, setErrorMessage] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const navigate = useNavigate();

  const {handleSubmit, formState:{errors}, control} = useForm<UserRegister>({
    defaultValues: {
      firstName: '',
      surName: '',
      nickName: '',
      email: '',
      password: '',
    }
  })

  const onSubmit: SubmitHandler<UserRegister> = async (data) => {
    setLoading(true);
    try{
      const response = await registerUserService(data);
      if(response.status == 200 || response.status == 201){
        setLoading(false);
        navigate("/login");
      }
    } catch(error){
      if(error instanceof AxiosError){
        setErrorMessage(error.response?.data);
      } else if(typeof error === "string"){
        setErrorMessage(error);
      }
      setLoading(false);
    }
  }

  return (
    <main className="h-screen w-screen flex justify-center items-center text-primaryBlack">
      <form onSubmit={handleSubmit(onSubmit)} className="w-[80%] md:w-2/3 lg:w-1/3 xl:w-1/4 h-fit flex flex-col items-center gap-y-6">
        <Title message="Crie a sua conta" black bold center fullWidth />
        <div className="flex flex-col gap-y-3 w-full">
          {errorMessage && (
            <Error>{errorMessage}</Error>
          )}
          <Controller
            control={control}
            name='firstName'
            rules={{
              required:{
                value:true,
                message:"Campo obrigatório"
              },
              maxLength:{
                value:50,
                message:"Máximo de 50 caracteres"
              }
            }}
            render={({field:{name,onChange,value}}) => (
              <div>
                <Input
                  id={name}
                  type="text"
                  label="Primeiro nome*"
                  placeholder="Digite seu primeiro nome..."
                  hasText
                  value={value}
                  onChange={onChange}
                  />
                  <Error>
                    {errors.firstName && (errors.firstName.type === "required" && errors.firstName.message)}
                    {errors.firstName && (errors.firstName.type === "maxLength" && errors.firstName.message)}
                  </Error>
              </div>
            )}
            />
           <Controller
            control={control}
            name='surName'
            rules={{
              required:{
                value:true,
                message:"Campo obrigatório"
              },
              maxLength:{
                value:50,
                message:"Máximo de 50 caracteres"
              }
            }}
            render={({field:{name,onChange,value}}) => (
              <div>
                <Input
                  id={name}
                  type="text"
                  label="Sobrenome*"
                  placeholder="Digite o sobrenome..."
                  hasText
                  value={value}
                  onChange={onChange}
                  />
                  <Error>
                    {errors.surName && (errors.surName.type === "required" && errors.surName.message)}
                    {errors.surName && (errors.surName.type === "maxLength" && errors.surName.message)}
                  </Error>
              </div>
            )}
            />
            <Controller
            control={control}
            name='nickName'
            rules={{
              required:{
                value:true,
                message:"Campo obrigatório"
              },
              maxLength:{
                value:50,
                message:"Máximo de 50 caracteres"
              }
            }}
            render={({field:{name,onChange,value}}) => (
              <div>
                <Input
                  id={name}
                  type="text"
                  label="Apelido*"
                  placeholder="Digite o seu apelido..."
                  hasText
                  value={value}
                  onChange={onChange}
                  />
                  <Error>
                    {errors.nickName && (errors.nickName.type === "required" && errors.nickName.message)}
                    {errors.nickName && (errors.nickName.type === "maxLength" && errors.nickName.message)}
                  </Error>
              </div>
            )}
            />
           <Controller
            control={control}
            name='email'
            rules={{
              required:{
                value:true,
                message:"Campo obrigatório"
              },
              maxLength:{
                value:50,
                message:"Máximo de 100 caracteres"
              },
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                message:"Email inválido"
              }
            }}
            render={({field:{name,onChange,value}}) => (
              <div>
                <Input
                  id={name}
                  type="email"
                  label="Email*"
                  placeholder="Digite o seu email..."
                  hasText
                  value={value}
                  onChange={onChange}
                  />
                  <Error>
                    {errors.email && (errors.email.type === "required" && errors.email.message)}
                    {errors.email && (errors.email.type === "maxLength" && errors.email.message)}
                    {errors.email && (errors.email.type === "pattern" && errors.email.message)}
                  </Error>
              </div>
            )}
            />
            <Controller
            control={control}
            name='password'
            rules={{
              required:{
                value:true,
                message:"Campo obrigatório"
              },
              maxLength:{
                value:50,
                message:"Máximo de 12 caracteres"
              },
            }}
            render={({field:{name,onChange,value}}) => (
              <div>
                <Input
                  id={name}
                  label="Senha*"
                  placeholder="Digite a sua senha..."
                  hasText
                  value={value}
                  onChange={onChange}
                  password
                  icon={<IoEye />}
                  />
                  <Error>
                    {errors.password && (errors.password.type === "required" && errors.password.message)}
                    {errors.password && (errors.password.type === "maxLength" && errors.password.message)}
                  </Error>
              </div>
            )}
            />
          </div>
        <div className="text-sm text-bodyColor gap-2 flex flex-row items-center">
          <span>Já possui uma conta?</span>
          <a href="/login" className="font-bold text-primaryBlack underline">Clique aqui para acessar!</a>
        </div>
        <Button
          onlyBorder={false}
          small={false}
          type='submit'
          fullWidth
          loading={loading}
        >
          Cadastrar
        </Button>
      </form>
    </main>
  );
};

export default Register;
