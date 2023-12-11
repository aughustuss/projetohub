interface TitleProps {
    message: string;
    green: boolean;
    center: boolean;
    bold: boolean;
}
const Title = ({message, green, center, bold}: TitleProps) => {
  return (
    <h1 className={` ${green ? "text-primaryNeon" : "text-newWhite"} ${center ? "text-center" : "text-left"} ${bold ? "font-bold" : "font-normal"} text-navTitle font-title w-fit `}>
          {message}
        </h1>
  )
}

export default Title