import Banner from "components/banner";
import Categories from "components/categories";
const Home = () => {
  return (
    <>
      <main className="flex flex-col gap-y-[100px]  w-full px-4 md:w-[90%] md:px-0 mx-auto">
        <Banner />
        <Categories/>
      </main>
    </>
  );
};

export default Home;
