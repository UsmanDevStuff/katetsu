import React from "react";
import MainLayout from "../components/layout/MainLayout";
import Card from "../components/small-components/Card";
import { getPopularAnime } from "../src/handlers/index";

export async function getServerSideProps() {
  const data = await getPopularAnime();

  return {
    props: {
      data,
    },
  };
}

const Home = ({ data }) => {
  return (
    <MainLayout>
      {data && (
        <>
          <div className=" mt-5 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 auto-rows-[1fr] 2xl:grid-cols-7">
            {data &&
              data.map((anime) => <Card key={anime.animeId} data={anime} />)}
          </div>
        </>
      )}
    </MainLayout>
  );
};

export default Home;
