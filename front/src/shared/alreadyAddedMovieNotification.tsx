import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface NotificationProps {
    message: string;
}
const AlreadyAddedMovieNotification = ({message}: NotificationProps) => {
  toast(message, {
    position: "top-right",
    autoClose: 500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    rtl: false,
    bodyClassName: "text-darkTitleColor shadow-none text-sm",
  });
  return (
    <ToastContainer
    />
  );
};

export default AlreadyAddedMovieNotification;
