import { CgSpinnerTwo } from "react-icons/cg";

const Loading = () => {
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="flex flex-row items-center gap-x-2">
        <p>Carregando... </p>
        <CgSpinnerTwo className="animate-spin" />{" "}
      </div>
    </div>
  );
};

export default Loading;
