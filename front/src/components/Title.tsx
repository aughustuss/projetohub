interface TitleProps {
    message: string;
    green: boolean;
    center: boolean;
}
const Title = ({message, green, center}: TitleProps) => {
  return (
    <h1 className={` ${green ? "text-primaryNeon" : "text-newWhite"} ${center ? "text-center" : "text-justify"} text-title font-title font-black`}>
          {message}
        </h1>
  )
}

export default Title