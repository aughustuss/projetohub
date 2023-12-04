import { CgSpinnerTwo } from "react-icons/cg";

const Loading = () => {
  return (
    <div className="h-[400px] flex flex-col justify-center items-center italic text-bodyColor">
      <div className="flex flex-row items-center gap-x-2 w-fit text-sm">
        <p>Carregando... </p>
        <CgSpinnerTwo className="animate-spin" />{" "}
      </div>
    </div>
  );
};

export default Loading;
