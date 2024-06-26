import Button from "components/Button";
import Error from "components/Error";
import Input from "components/Input";
import Title from "components/Title";
import LoginContext from "contexts/LoginContext";
import { AllCategories } from "data/Categories";
import { MovieCompanyModel } from "models/entities/MovieById";
import React from "react";
import Dropzone from "react-dropzone";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createMovieService, getCompanieForMovieCreateService } from "services/Services";

interface Language {
  id: number;
  name: string;
}
export interface CustomFile extends File {
  preview: string;
}

enum MovieStatus {
	Released,
	NotReleased,
}
export interface MovieRegister {
	age: number;
	genres: Array<number>;
	languages: Array<number>;
	companies: Array<number>;
	addedDate: Date;
	budget: number;
	originalTitle: string;
	overview: string;
	releaseDate: Date;
	revenue: number;
	runtime: number;
	status: MovieStatus;
	tagline: string;
	title: string;
	hasVideo: boolean;
	backdrop: Blob | null;
	homepage: string;
	imdbId: number | null;
	originalLanguage: string;
	poster: Blob | null;
}

const movieRegisterLanguages: Array<Language> = [
  { id: 1, name: "Português" },
  { id: 2, name: "Italiano" },
  { id: 3, name: "Inglês" },
  { id: 4, name: "Espanhol" },
  { id: 5, name: "Francês" },
  { id: 6, name: "Alemão" },
  { id: 7, name: "Chinês" },
  { id: 8, name: "Japonês" },
  { id: 9, name: "Russo" },
  { id: 10, name: "Árabe" },
  { id: 11, name: "Coreano" },
  { id: 12, name: "Holandês" },
  { id: 13, name: "Hindi" },
  { id: 14, name: "Turco" },
  { id: 15, name: "Sueco" }
]

const MovieRegister = () => {

  const navigate = useNavigate();

  const {token} = React.useContext(LoginContext);
	const [poster, setPoster] = React.useState<CustomFile[]>([]);
  const [banner, setBanner] = React.useState<CustomFile[]>([]);
  const [genres, setGenres] = React.useState<number[]>([]);
  const [languages, setLanguages] = React.useState<number[]>([]);
  const [companies, setCompanies] = React.useState<MovieCompanyModel[]>([]);
  const [selectedCompanies, setSelectedCompanies] = React.useState<number[]>([]);
  const [isLoading, setLoading] = React.useState<boolean>();

  const getCompaniesForMovieCreate = async () => {
    try{
      const response = await getCompanieForMovieCreateService(token);
      if(response.data)
        setCompanies(response.data);
      console.log(companies);
    } catch (error){
      console.log(error);
    }
  }

  
  React.useEffect(() => {
    getCompaniesForMovieCreate();
  }, [])
  
	const {
		control,
		formState: { errors },
		handleSubmit,
		setValue,
	} = useForm<MovieRegister>({
		defaultValues: {
			age: 0,
			genres: [],
			languages: [],
			companies: [],
			addedDate: new Date(),
			budget: 0,
			originalTitle: "",
			overview: "",
			releaseDate: new Date(),
			revenue: 0,
			runtime: 0,
			status: MovieStatus.Released,
			tagline: "",
			title: "",
			hasVideo: false,
			backdrop: undefined,
			homepage: "",
			imdbId: null,
			originalLanguage: "",
			poster: undefined,
		},
	});

  const handleGenreChange = (value: React.ChangeEvent<HTMLSelectElement>) => {
    if (Number.parseInt(value.target.value) !== 0) {
      setGenres(prevGenres => {
        const newGenres = [...prevGenres, Number.parseInt(value.target.value)];
        setValue("genres", newGenres); 
        return newGenres;
      });
    }
  }

  const handleCompanyChange = (value: React.ChangeEvent<HTMLSelectElement>) => {
    if (Number.parseInt(value.target.value) !== 0) {
      const company = Number.parseInt(value.target.value)

      if(value.target.value !== "redirect"){
        setSelectedCompanies(prevCompanies => {
          const newCompanies = [...prevCompanies, company];
          setValue("companies", newCompanies); 
          return newCompanies;
        });
      } else {
        navigate("/companyRegister");
      }
    }
  }

  const handleLanguageChange = (value: React.ChangeEvent<HTMLSelectElement>) => {
    if (Number.parseInt(value.target.value)!== 0) {
      setLanguages(prevLanguages => {
        const newLanguages = [...prevLanguages, Number.parseInt(value.target.value)];
        setValue("languages", newLanguages); 
        return newLanguages;
      });
    }
  }

  const removeGenreFromList = (genre: number) => {
    setGenres(prevGenres => {
      return prevGenres.filter(g => g!== genre);
    })
    setValue("genres", genres);
  }

  const removeCompanyFromList = (company: number) => {
    setSelectedCompanies(prevCompanies => {
      return prevCompanies.filter(c => c !== company);
    })
    setValue("companies", selectedCompanies)
  }

  const removeLanguageFromList = (language: number) => {
    setLanguages(prevLanguages => {
      return prevLanguages.filter(l => l!== language);
    })
    setValue("languages", languages);
  }

	const onSubmit: SubmitHandler<MovieRegister> = async (data) => {
		data.addedDate = new Date();
    const formData = new FormData();

    formData.append("addedDate", data.addedDate.toISOString());
    formData.append("budget", data.budget.toString());
    formData.append("originalTitle", data.originalTitle);
    formData.append("overview", data.overview);
    formData.append("releaseDate", data.releaseDate.toString());
    formData.append("revenue", data.revenue.toString());
    formData.append("runtime", data.runtime.toString());
    formData.append("status", data.status.toString());
    formData.append("tagline", data.tagline);
    formData.append("title", data.title);
    formData.append("hasVideo", data.hasVideo.toString());
    formData.append("homapage", data.homepage);
    formData.append("imdbIb", data.imdbId ? data.imdbId.toString() : "");
    formData.append("originalLanguage", data.originalLanguage);
    formData.append("age", data.age.toString());
    formData.append("poster", data.poster? data.poster : "");
    formData.append("backdrop", data.backdrop? data.backdrop : "");
    data.languages.forEach((language) => {
      formData.append("languages", language.toString());
    })
    data.genres.forEach((genre) => {
      formData.append("genres", genre.toString());
    })
    data.companies.forEach((company) => {
      formData.append("companies", JSON.stringify(company));
    })
    setLoading(true);
    try{
      const response = await createMovieService(formData, token);
      if(response.status == 200){
        setLoading(false);
        navigate("/");
      }
    } catch (error){
      console.log(error);
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
            className="w-full md:w-2/3 flex flex-col gap-4 items-center p-6 bg-newWhite shadow rounded-xl"
          >
          <Title
            black
            bold
            fullWidth
            center
            message="Cadastro de filmes"
          />
            <div className="w-full flex flex-col md:flex-row gap-x-4">
              <div className="w-full flex flex-col gap-y-2 md:w-1/2 ">
                <div className="w-full flex flex-row gap-x-2 ">
                  <Controller
                    control={control}
                    name="poster"
                    rules={{
                      required: {
                        message: "Campo obrigatório",
                        value: true,
                      }
                    }}
                    render={({field:{name}}) => (
                      <>
                      <div className="flex flex-col gap-y-1">
                        <Dropzone onDrop={(files) => {
                          setPoster(files.map(file => Object.assign(file, {
                            preview: URL.createObjectURL(file),
                          }),setValue("poster", files[0])));
                        }}
                          maxFiles={1}
                          multiple={false}
                        >
                          {({getRootProps, getInputProps, isDragActive, isFocused}) => (
                              <div className="flex flex-col gap-y-1" >
                                <label htmlFor={name}>Imagem do Poster*</label>
                                <div className={`${isFocused && 'border-tertiary'} hover:border-tertiary cursor-pointer rounded-xl p-4 border-2 border-dashed text-sm text-bodyColor`} {...getRootProps()}>
                                  <input id={name} {...getInputProps()} />
                                  {isDragActive ? (
                                    <p>
                                      Solte a imagem aqui...
                                    </p>
                                  ) : (
                                    <p>Arraste e solte uma imagem aqui ou clique para buscar...</p>
                                  )}
                                </div>
                                {poster.length > 0 ? (
                                  <div className="relative w-[150px]">
                                    <img className="w-full h-[200px] rounded-xl" onLoad={() => URL.revokeObjectURL(poster[0].preview)} src={poster[0].preview} />
                                    <button onClick={() => {
                                      setPoster([]);
                                      setValue("poster", null)
                                    }} className="absolute top-1 right-2 font-bold text-primaryBlack bg-white rounded-full py-1 px-3"  >x</button>
                                  </div>
                                ) : null}
                            </div>
                          )}
                        </Dropzone>
                        <Error>
                          {errors.poster && (errors.poster.type === "required" && errors.poster.message)}
                        </Error>
                      </div>
                      </>
                    )}
                  />
                  <Controller
                    control={control}
                    name="backdrop"
                    rules={{
                      required: {
                        message: "Campo obrigatório",
                        value: true,
                      }
                    }}
                    render={({field:{name}}) => (
                      <>
                        <div className="flex flex-col gap-y-1">
                          <Dropzone onDrop={(files) => {
                            setBanner(files.map(file => Object.assign(file, {
                              preview: URL.createObjectURL(file),
                            }),setValue("backdrop", files[0])));
                          }}
                            maxFiles={1}
                            multiple={false}
                          >
                            {({getRootProps, getInputProps, isDragActive, isFocused}) => (
                              <>
                                <div className="flex flex-col gap-y-1" >
                                  <label htmlFor={name}>Imagem do Banner*</label>
                                  <div className={`${isFocused && 'border-tertiary'} hover:border-tertiary cursor-pointer rounded-xl p-4 border-2 border-dashed text-sm text-bodyColor`} {...getRootProps()}>
                                    <input id={name} {...getInputProps()} />
                                    {isDragActive ? (
                                      <p>
                                        Solte a imagem aqui...
                                      </p>
                                    ) : (
                                      <p>Arraste e solte uma imagem aqui ou clique para buscar...</p>
                                    )}
                                  </div>
                                  {banner.length > 0 ? (
                                    <div className="relative w-full">
                                      <img className="w-full h-[200px] rounded-xl" onLoad={() => URL.revokeObjectURL(banner[0].preview)} src={banner[0].preview} />
                                      <button onClick={() => {
                                        setBanner([]);
                                        setValue("backdrop", null)
                                      }} className="absolute top-1 right-2 font-bold text-primaryBlack bg-white rounded-full py-1 px-3" >x</button>
                                    </div>
                                  ) : null}
                                </div>
                              </>
                            )}
                          </Dropzone>
                          <Error>
                            {errors.backdrop && (errors.backdrop.type === "required" && errors.backdrop.message)}
                          </Error>
                        </div>
                      </>
                    )}
                  />
                </div>
                <Controller
                  control={control}
                  defaultValue=""
                  name="title"
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
                  render={({field:{value, name,onChange}}) => (
                    <div>
                      <Input
                        id={name}
                        label="Título do filme*"
                        onChange={onChange}
                        placeholder="Digite o título do filme..."
                        value={value}
                        type="text"
                      />
                      <Error>
                        {errors.title && (errors.title.type === "required" && errors.title.message)}
                        {errors.title && (errors.title.type === "maxLength" && errors.title.message)}
                      </Error>
                    </div>
                  )}
                />
                <Controller
                  control={control}
                  defaultValue=""
                  name="originalTitle"
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
                  render={({field:{onChange,name,value}}) => (
                    <div>
                      <Input
                        id={name}
                        label="Título original do filme*"
                        onChange={onChange}
                        placeholder="Digite o título original do filme..."
                        value={value}
                        type="text"
                      />
                      <Error>
                        {errors.originalTitle && (errors.originalTitle.type === "required" && errors.originalTitle.message)}
                        {errors.originalTitle && (errors.originalTitle.type === "maxLength" && errors.originalTitle.message)}
                      </Error>
                    </div>
                  )}
                  />
                  <Controller
                  control={control}
                  defaultValue=""
                  name="originalLanguage"
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
                  render={({field:{onChange,name,value}}) => (
                    <div>
                      <Input
                        id={name}
                        label="Língua original do filme*"
                        onChange={onChange}
                        placeholder="Digite a linguagem original do filme..."
                        value={value}
                        type="text"
                      />
                      <Error>
                        {errors.originalLanguage && (errors.originalLanguage.type === "required" && errors.originalLanguage.message)}
                        {errors.originalLanguage && (errors.originalLanguage.type === "maxLength" && errors.originalLanguage.message)}
                      </Error>
                    </div>
                  )}
                  />
                  <Controller
                    control={control}
                    defaultValue=""
                    name="overview"
                    rules={{
                      required: {
                        message: "Campo obrigatório",
                        value: true,
                      },
                      maxLength: {
                        message: "Máximo de 255 caracteres",
                        value: 255,
                      },
                    }}
                    render={({field:{name,value,onChange}}) => (
                      <div className="flex flex-col gap-y-2">
                        <label htmlFor={name}>Sinopse*</label>
                        <textarea
                          value={value}
                          onChange={onChange}
                          rows={6}
                          id={name}
                          className="rounded-xl bg-newWhite border-border border p-2"
                        />
                        <Error>
                          {errors.overview && (errors.overview.type === "required" && errors.overview.message)}
                          {errors.overview && (errors.overview.type === "maxLength" && errors.overview.message)}
                        </Error>
                      </div>
                    )}
                    />
                    <Controller
                      control={control}
                      name="tagline"
                      defaultValue=""
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
                      render={({field:{value,name,onChange}}) => (
                        <div>
                          <Input
                            id={name}
                            label="Tagline*"
                            onChange={onChange}
                            placeholder="Digite a tagline do filme..."
                            value={value}
                            type="text"
                          />
                          <Error>
                            {errors.tagline && (errors.tagline.type === "required" && errors.tagline.message)}
                            {errors.tagline && (errors.tagline.type === "maxLength" && errors.tagline.message)}
                          </Error>
                        </div>
                      )}
                    />
                  <Controller
                    control={control}
                    name="genres"
                    rules={{
                      required: {
                        message: "Campo obrigatório",
                        value: true,
                      }
                    }}
                    render={({field:{name}}) => (
                      <>  
                      <div className="flex flex-col flex-wrap gap-y-1">
                        <label htmlFor={name}>Selecione os gêneros do filme*</label>
                        <div className="flex flex-row items-center flex-wrap gap-2">
                          {genres.length > 0 && genres.map((genre, index) => (
                            <div key={index} className="text-xs rounded-xl w-fit px-6 py-1 border border-border text-bodyColor relative">
                              <span  >
                                {genre}
                              </span>
                              <button type="button" onClick={() => removeGenreFromList(genre)} className="absolute right-2 top-0">x</button>
                            </div>
                          ))}
                        </div>
                        <select 
                          id={name}
                          className="py-2 rounded-lg text-sm text-newBlack w-full border border-border bg-newWhite"
                          onChange={handleGenreChange}
                        >
                          <option value={0} defaultValue={0}>Selecione</option>
                          {AllCategories.filter((genre) => !genres.includes(genre.id)).map((genre) => (
                            <option key={genre.id} value={genre.id}>
                              {genre.name}
                            </option>
                          ))}
                        </select>
                        <Error>
                            {errors.genres && (errors.genres.type === "required" && errors.genres.message)}
                          </Error>
                        </div>
                      </>
                    )}
                  />
              </div>

              {/* Primeira metade da tela */}

              <div className="w-full md:w-1/2 flex flex-col gap-y-2">
                <Controller
                  control={control}
                  name="companies"
                  rules={{
                    required:{
                      value: selectedCompanies.length === 0,
                      message: "Campo obrigatório"
                    }
                  }}
                  render={({field:{name}}) => (
                    <div className="flex flex-col flex-wrap gap-y-1">
                        <label htmlFor={name}>Selecione as produtoras do filme*</label>
                        <div className="flex flex-row items-center flex-wrap gap-2">
                          {selectedCompanies.length > 0 && selectedCompanies.map((company, index) => (
                            <div key={index} className="text-xs rounded-xl w-fit px-6 py-1 border border-border text-bodyColor relative">
                              <span  >
                                {company}
                              </span>
                              <button type="button" onClick={() => removeCompanyFromList(company)} className="absolute right-2 top-0">x</button>
                            </div>
                          ))}
                        </div>
                        <select 
                          id={name}
                          className="py-2 rounded-lg text-sm text-newBlack w-full border border-border bg-newWhite"
                          onChange={handleCompanyChange}
                        >
                          <option value={0} defaultValue={0}>Selecione</option>
                          {companies.length > 0 ? (
                            <>
                            {companies.filter((company) => !selectedCompanies.some(selectedCompany => selectedCompany == company.id)).map((company) => (
                              <option key={company.id} value={company.id}>
                                {company.name}
                              </option>
                            ))}
                            </>
                          ) : (
                            <option value="redirect" className="text-center underline py-2" onClick={() => navigate("/login")}>Nenhuma produtora cadastrada. Clique aqui para cadastrar uma.</option>
                          )}
                        </select>
                        <Error>
                            {errors.companies && (errors.companies.type === "required" && errors.companies.message)}
                          </Error>
                      </div>
                  )}
                />

                <Controller
                  control={control}
                  name="languages"
                  rules={{
                    required:{
                      value: languages.length === 0,
                      message: "Campo obrigatório"
                    }
                  }}
                  render={({field:{name}}) => (
                    <div className="flex flex-col flex-wrap gap-y-1">
                    <label htmlFor={name}>Selecione os idiomas disponíveis para o filme*</label>
                    <div className="flex flex-row items-center flex-wrap gap-2">
                      {languages.length > 0 && languages.map((language, index) => (
                        <div key={index} className="text-xs rounded-xl w-fit px-6 py-1 border border-border text-bodyColor relative">
                          <span  >
                            {language}
                          </span>
                          <button type="button" onClick={() => removeLanguageFromList(language)} className="absolute right-2 top-0">x</button>
                        </div>
                      ))}
                    </div>
                    <select 
                      id={name}
                      className="py-2 rounded-lg text-sm text-newBlack w-full border border-border bg-newWhite"
                      onChange={handleLanguageChange}
                    >
                      <option value={0} defaultValue={0}>Selecione</option>
                      {movieRegisterLanguages.filter((language) => !languages.includes(language.id)).map((language) => (
                        <option key={language.id} value={language.id}>
                          {language.name}
                        </option>
                      ))}
                    </select>
                    <Error>
                        {errors.languages && (errors.languages.type === "required" && errors.languages.message)}
                      </Error>
                  </div>
                  )}
                />

                <Controller
                  control={control}
                  name="releaseDate"
                  rules={{
                    required:{
                      value: true,
                      message: "Campo obrigatório"
                    }
                  }}
                  render={({field:{name, onChange}}) => (
                    <div>
                      <Input
                        type="date"
                        label="Data de lançamento*"
                        placeholder="Data de lançamento do filme..."
                        onChange={onChange}
                        id={name}
                      />
                    </div>
                  )}
                />
                <Controller
                  control={control}
                  name="age"
                  rules={{
                    required:{
                      value: true,
                      message: "Campo obrigatório"
                    }
                  }}
                  render={({field:{name, onChange}}) => (
                    <div>
                      <Input
                        type="number"
                        label="Classificação indicativa*"
                        placeholder="Informe a classificação indicativa do filme..."
                        onChange={onChange}
                        id={name}
                      />
                    </div>
                  )}
                />
                <Controller
                  control={control}
                  name="budget"
                  rules={{
                    required:{
                      value: true,
                      message: "Campo obrigatório"
                    }
                  }}
                  render={({field:{name,onChange,value}}) => (
                    <div>
                      <Input
                        type="number"
                        label="Informe o investimento total do filme*"
                        onChange={onChange}
                        id={name}
                        value={value}
                        placeholder="Investimento do filme..."
                      />
                      <Error>
                        {errors.budget && (errors.budget.type === "required" && errors.budget.message)}
                      </Error>
                    </div>
                  )}
                />
                <Controller
                  control={control}
                  name="revenue"
                  defaultValue={0}
                  rules={{
                    required:{
                      value: true,
                      message: "Campo obrigatório"
                    }

                  }}
                  render={({field:{name,onChange,value}}) => (
                    <div>
                      <Input
                        type="number"
                        label="Informe a receita do filme*"
                        onChange={onChange}
                        id={name}
                        value={value}
                        placeholder="Receita do filme..."
                      />
                      <Error>
                        {errors.revenue && (errors.revenue.type === "required" && errors.revenue.message)}
                      </Error>
                    </div>
                  )}
                />
                <Controller
                  control={control}
                  name="runtime"
                  rules={{
                    required:{
                      value: true,
                      message: "Campo obrigatório"
                    }
                  }}
                  render={({field:{name,onChange,value}}) => (
                    <div>
                      <Input
                        type="text"
                        label="Informe o tempo de duração do filme em minutos*"
                        onChange={onChange}
                        id={name}
                        value={value}
                        placeholder="Duração do filme..."
                      />
                      <Error>
                        {errors.runtime && (errors.runtime.type === "required" && errors.runtime.message)}
                      </Error>
                    </div>
                  )}
                />
                <Controller
                  control={control}
                  name="homepage"
                  rules={{
                    required: false
                  }}
                  render={({field:{name,onChange,value}}) => (
                    <div>
                      <Input
                        type="text"
                        label="Informe a página de lançamento do filme"
                        onChange={onChange}
                        id={name}
                        value={value}
                        placeholder="URL do site do filme..."
                      />
                    </div>
                  )}
                />
                <Controller
                  control={control}
                  name="imdbId"
                  rules={{
                    required: false
                  }}
                  render={({field:{name,onChange,value}}) => (
                    <div>
                      <Input
                        type="text"
                        label="Link do IMBD do filme"
                        onChange={onChange}
                        id={name}
                        value={value ?? undefined}
                        placeholder="IMDB do filme..."
                      />
                    </div>
                  )}
                />
              </div>
            </div>
            <Button loading={isLoading} onlyBorder={false} small={false} type="submit">
              Cadastrar
            </Button>
          </form>
        </section>
      </main>
		</>
	);
};

export default MovieRegister;
