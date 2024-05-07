import React from "react";
import { FaTimes, FaPaperPlane } from "react-icons/fa";
import Title from "./Title";
import Button from "./Button";
import { MovieCommentsModel } from "models/entities/MovieById";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Error from "./Error";
import { CommentCreateModel } from "models/entities/Comment";
import { addCommentToMovieService } from "services/Services";
import Text from "./Text";
import Row from "./Row";
import LoginContext from "contexts/LoginContext";
import { UserShortProfileModel } from "models/entities/User";

interface CommentSectionProps {
	comments: MovieCommentsModel[];
	movieId: string;
	user?: UserShortProfileModel
}

const CommentSection: React.FC<CommentSectionProps> = ({
	comments,
	movieId,
	user
}) => {
	
	const { isLoggedIn, token } = React.useContext(LoginContext);
	const [newComments, setNewComments] = React.useState<MovieCommentsModel[]>([]);
	const {
		control,
		formState: { errors },
		handleSubmit,
		setValue,
	} = useForm<CommentCreateModel>({
		defaultValues: {
			text: "",
			movieId: "",
			creationDate: undefined,
		},
	});

	React.useEffect(() => {
		setNewComments(comments);
	},[])

	const onSubmit: SubmitHandler<CommentCreateModel> = (
		data: CommentCreateModel
	) => {
		data.movieId = movieId;
		data.creationDate = new Date();
		Promise.resolve(
			addCommentToMovieService(data, token)
				.then((res) => {
					if(res.status === 200){
						if(user != null){
							const newComment: MovieCommentsModel = {
								author: user,
								creationDate: new Date(),
								text: data.text,
							}
							setNewComments([...comments, newComment])
							}
						}
				}).catch((err) => {
					console.log(err);
				})
		);
	};


	return (
		<div className="flex flex-col gap-y-4 pt-[20px] pb-[100px] w-full px-6 md:w-[85%] md:px-0 mx-auto border-t border-border">
			<Title bold center={false} black message="Seção de Comentários" />
			<div className="flex flex-col-reverse w-full md:w-3/5 gap-y-4">
				<div className="flex flex-col gap-y-4">
					{newComments.map((comment, index) => (
						<div key={index} className="p-4 flex flex-col h-auto gap-4 rounded-xl border border-border text-bodyColor">
						{" "}
						<div className="flex items-start">
							<img
								className="rounded-full w-8 h-8 mr-4"
								src={comment.author.profileImageSource}
								alt={`Imagem de perfil de ${comment.author.firstName}`}
							/>
							<div className="text-primaryBlack text-sm flex flex-col gap-4">
								<Row capitalize responsive baseline>
									<Text bold text={comment.author.nickName} />
									<p className="text-xs italic">
										- {comment.author.profileTitle}
									</p>
								</Row>
								<p className="text-bodyColor">{comment.text}</p>
							</div>
						</div>
						<div className="flex items-center text-sm">
							<small className="text-xs italic">
								Comentário adicionado em:{" "}
								{new Date(comment.creationDate).toLocaleDateString()}
							</small>
						</div>
					</div>
					))}
				</div>
				<div className="border border-border" />
				{isLoggedIn ? (
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="flex flex-row "
					>
						<img
							className="rounded-3xl w-20 h-20 mr-4"
							alt="Imagem do autor"
							src={user?.profileImageSource}
						/>
						<div className="relative w-full">
							<Controller
								name="text"
								control={control}
								defaultValue=""
								rules={{
									required: {
										value: true,
										message: "Campo obrigatório",
									},
								}}
								render={({
									field: { name, onChange, value },
								}) => (
									<>
										<textarea
											id={name}
											onChange={onChange}
											value={value}
											className="w-full p-2 rounded-lg border-border border bg-transparent text-primaryBlack outline-none text-sm"
											rows={4}
											placeholder="Escreva seu comentário..."
										/>
										<Error>
											{errors.text &&
												errors.text.type ==
													"required" &&
												errors.text.message}
										</Error>
									</>
								)}
							></Controller>
							<div className="flex flex-wrap gap-2 items-center justify-start md:justify-end ">
								<div className="flex flex-col md:flex-row items-start md:items-end justify-end gap-2">
									<Button onlyBorder small onClick={() => setValue("text", "")}>
										{" "}
										Cancelar
										<FaTimes className="ml-2" />
									</Button>
									<Button
										onlyBorder={false}
										small
										type="submit"
									>
										Enviar Comentário
										<FaPaperPlane className="ml-2" />
									</Button>
								</div>
							</div>
						</div>
					</form>
				) : (
					<p className="italic h-[100px] text-bodyColor flex items-center">Faça o login para comentar...</p>
				)}
			</div>
		</div>
	);
};

export default CommentSection;
