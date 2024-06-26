import React from "react";
import useNavLinks from "data/NavLinks";
import { NavbarLink } from "models/entities/NavLink";
import { AllCategories } from "data/Categories";
import { MdKeyboardArrowDown } from "react-icons/md";
import LoginContext from "contexts/LoginContext";
import { getUserFavoriteListCountService } from "services/Services";
interface LinksMappedProps {
	isAboveLG: boolean;
}

const LinksMapped = ({ isAboveLG }: LinksMappedProps) => {
	const [categoriesMenuOpen, setCategoriesMenuOpen] = React.useState<boolean>(false);

	const { isLoggedIn, logout, token, isAdmin } = React.useContext(LoginContext);
	const [userFavoriteListCount, setUserFavoriteListCount] = React.useState<number>(0);

	const navLinks = useNavLinks({
		isAboveLg: isAboveLG,
		isAdmin: isAdmin,
		isLoggedIn: isLoggedIn,
		logout: logout
	})

	const handleCategoriesMenu = () => {
		setCategoriesMenuOpen(!categoriesMenuOpen);
	};

	const getUserFavoriteListCount = async () => {
		try{
			const response = await getUserFavoriteListCountService(token);
			setUserFavoriteListCount(response.data);
		} catch (err){
			console.log(err);
		}
	}

	React.useEffect(() => {
		if(isLoggedIn)
			getUserFavoriteListCount();
	}, [])

	return (
		<>
			{navLinks.map((i: NavbarLink, index: number) => (
				<div
					id={index.toString()}
					key={index}
					className={`text-newWhite" 
          ${
				i.show ? "block" : "hidden"
			}  transition-all duration-300 flex flex-col justify-center items-center w-full text-[13px]`}
				>
					{isAboveLG ? (
						<div>
							{!i.linkIcon &&
								i.linkText !== "Filmes" && i.linkText !== "Cadastros" &&
								i.show && (
									<>
										<a onClick={i.action} href={i.linkTo}>
											{i.linkText}
										</a>
									</>
								)}
							{!i.linkIcon && i.linkText === "Filmes" && (
								<div
									id={index.toString()}
									className="group relative w-full cursor-pointer"
								>
									<span className="hover:text-underline">
										Filmes
									</span>
									<div
										className={`hidden group-hover:absolute group-hover:top-full group-hover:w-[320px] h-auto p-4 absolute text-xs gap-6 bg-primaryBg shadow-lg shadow-black/40 rounded-lg group-hover:grid group-hover:grid-cols-3 group-hover:place-items-start group-hover:mx-auto ${
											isLoggedIn
												? "group-hover:left-0"
												: "group-hover:-right-full"
										} `}
									>
										{AllCategories.map((cat) => (
											<a
												href={`/genre/${cat.id}`}
												className="text-start text-newWhite hover:underline transition duration-300"
												key={cat.id}
											>
												{cat.name}
											</a>
										))}
									</div>
								</div>
							)}
              {!i.linkIcon && i.linkText === "Cadastros" && (
								<div
									id={index.toString()}
									className="group relative w-full cursor-pointer"
								>
									<span className="hover:text-underline">
										Cadastros
									</span>
									<div
										className={`hidden group-hover:absolute group-hover:top-full group-hover:w-[120px] h-auto p-4 absolute text-xs gap-6 bg-primaryBg shadow-lg shadow-black/40 rounded-lg group-hover:flex group-hover:flex-col group-hover:place-items-start group-hover:mx-auto ${
											isLoggedIn
												? "group-hover:left-0"
												: "group-hover:-right-full"
										} `}
									>
										<a href="/movieRegister">Filmes</a>
										<a href="/companyRegister">Produtoras</a>
									</div>
								</div>
							)}
							{i.linkIcon &&
								i.linkText === "Conversas" && (
									<a
										href={i.linkTo}
										className="text-newWhite text-iconSize  relative hover:text-secondary transition duration-300 active:scale-95"
									>
										{<i.linkIcon />}

										<span className="absolute h-[16px] w-[16px] bg-red-600 rounded-full -right-1 -top-2 text-newWhite text-[10px] flex justify-center items-center">
											0
										</span>
									</a>
								)}
							{i.linkIcon &&
								i.linkText === "Favoritos" && (
									<a
										href={i.linkTo}
										className="text-newWhite text-iconSize  relative hover:text-secondary transition duration-300 active:scale-95"
									>
										{<i.linkIcon />}
										{userFavoriteListCount > 0 && (
											<span className="absolute h-[16px] w-[16px] bg-red-600 rounded-full -right-1 -top-2 text-newWhite text-[10px] flex justify-center items-center">
												{userFavoriteListCount}
											</span>
										)}
									</a>
								)}
						</div>
					) : (
						<>
							{i.linkText !== "Filmes" && (
								<a onClick={i.action} href={i.linkTo}>
									{i.linkText}
								</a>
							)}
							{i.linkText == "Filmes" && (
								<div className="flex flex-col items-center gap-y-1 w-full h-auto px-2">
									<span
										onClick={() => handleCategoriesMenu()}
										className="flex flex-row items-center justify-center gap-x-2 relative w-full cursor-pointer"
									>
										Filmes{" "}
										<MdKeyboardArrowDown
											className={`${
												categoriesMenuOpen
													? "rotate-0"
													: "rotate-180"
											} transition duration-300 absolute ml-[30%] text-lg`}
										/>
									</span>
									{categoriesMenuOpen && (
										<div className="flex flex-col justify-center items-center gap-5 h-[200px] overflow-auto py-4  w-full rounded-lg">
											{AllCategories.map((cat, index) => (
												<a
													key={cat.id}
													href={`/genre/${cat.id}`}
													className={`${
														index == 1 && "pt-10"
													} text-bodyColor text-xs hover:text-secondary`}
												>
													{cat.name}
												</a>
											))}
										</div>
									)}
								</div>
							)}
						</>
					)}
				</div>
			))}
		</>
	);
};

export default LinksMapped;
