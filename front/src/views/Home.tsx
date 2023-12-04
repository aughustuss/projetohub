import Banner from "components/Banner";
import Categories from "components/Categories";
import LastSearched from "components/LastSearched";
import Network from "components/Network";
import RecentlyAdded from "components/RecentlyAdded";
const Home = () => {
  return (
    <>
      <main className="flex flex-col gap-y-[100px] pt-[120px] w-full px-4 md:w-[90%] md:px-0 mx-auto">
        <Banner />

        <Categories />

        <Network/>

        <RecentlyAdded/>        

        <LastSearched/>
      </main>
    </>
  );
};

export default Home;
