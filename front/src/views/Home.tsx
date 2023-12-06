import Banner from "components/Banner";
import Categories from "components/Categories";
import LastSearched from "components/LastSearched";
import Trending from "components/Trending";
const Home = () => {
  return (
    <>
      <main className="flex flex-col gap-y-[100px] pt-[120px] w-full px-6 md:w-[85%] md:px-0 mx-auto">
        <Banner />

        <Categories />

        {/* <Network/> */}

        <Trending/>        

        <LastSearched/>
      </main>
    </>
  );
};

export default Home;
