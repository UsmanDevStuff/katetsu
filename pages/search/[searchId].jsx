import React from "react";
import MainLayout from "../../components/layout/MainLayout";
import Card from "../../components/small-components/Card";
import { getAnimeSearch } from "../../src/handlers";

export const getServerSideProps = async (context) => {
  const searchquery = await getAnimeSearch(context.query.searchId);

  return {
    props: {
      searchquery,
    },
  };
};

function SearchPage({ searchquery }) {
  console.log(searchquery);
  return (
    <MainLayout>
      {searchquery && (
        <>
          <div className=" ">
            <h1 className=" text-2xl font-bold">Searched Results</h1>

            {searchquery.length === 0 && (
              <div className=" mt-10 text-2xl ">No Results Found</div>
            )}
          </div>
          <div className=" mt-5 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 auto-rows-[1fr] 2xl:grid-cols-7">
            {searchquery &&
              searchquery?.map((searchquery) => <Card key={searchquery.animeId} data={searchquery} />)}
          </div>
        </>
      )}
    </MainLayout>
  );
}

export default SearchPage;
