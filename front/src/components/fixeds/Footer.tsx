interface FooterProps {
  showFooter: boolean;
}
const Footer = ({ showFooter }: FooterProps) => {
  return (
    <>
      {showFooter && (
        <footer className="w-full min-h-[130px] bg-black shadow-sm text-newWhite text-body flex flex-col items-center py-10">
          
          <address className="text-center text-xs text-bodyColor font-bold mt-2">
            HubFilmes &copy; 2024
          </address>
        </footer>
      )}
    </>
  );
};

export default Footer;
