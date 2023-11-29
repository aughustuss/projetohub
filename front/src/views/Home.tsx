import Banner from "components/banner";
import Categories from "components/categories";
import Network from "components/network";
import RecentlyAdded from "components/recentlyAdded";
const Home = () => {
  return (
    <>
      <main className="flex flex-col gap-y-[100px] w-full px-4 md:w-[90%] md:px-0 mx-auto">
        <Banner />

        <Categories />

        <Network/>

        <RecentlyAdded/>        
      </main>
    </>
  );
};

export default Home;
