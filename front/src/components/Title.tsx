interface TitleProps {
    message: string | React.ReactNode;
    black: boolean;
    center: boolean;
    bold: boolean;
    responsive?: boolean;
    fullWidth?: boolean;
}
const Title = ({message, black, center, bold, responsive, fullWidth}: TitleProps) => {
  return (
    <h1 className={` ${black ? "text-primaryBlack" : "text-newWhite"} ${center ? "text-center" : "text-left"} ${bold ? "font-black" : "font-normal"} ${responsive ? "text-base sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl" : "text-navTitle"} font-title ${fullWidth ? "w-full" : "w-fit"}`}>
          {message}
        </h1>
  )
}

export default Title