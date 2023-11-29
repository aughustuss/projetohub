import { CgSpinnerTwo } from "react-icons/cg";

const Loading = () => {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 ">
      <div className="flex flex-row items-center gap-x-2 w-fit">
        <p>Carregando... </p>
        <CgSpinnerTwo className="animate-spin" />{" "}
      </div>
    </div>
  );
};

export default Loading;
