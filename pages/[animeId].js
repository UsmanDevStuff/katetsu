import Head from "next/head";
import React from "react";
import AnimeDetails from "../components/anime-details/AnimeDetails";
import MainLayout from "../components/layout/MainLayout";
import { getAnimeDetails } from "../src/handlers";

export const getServerSideProps = async (context) => {
  const animedetails = await getAnimeDetails(context.query.animeId)
  return {
    props: {
      animedetails,
    },
  };
};

function AnimeDetailsPage({ animedetails }) {
  console.log(animedetails);
  return (
    <>
      <Head>
        <title>{animedetails?.animeTitle + " - Katetsu "}</title>
        <meta name="description" content={animedetails?.synopsis} />
        <meta name="keywords" content={animedetails?.genres} />
        <meta name="author" content="consumet" />

        <meta property="og:title" content={animedetails?.animeTitle} />
        <meta property="og:description" content={animedetails?.synopsis} />
        <meta property="og:image" content={animedetails?.animeImg} />
      </Head>
      <MainLayout useHead={false}>
        {animedetails && <AnimeDetails data={animedetails} />}
      </MainLayout>
    </>
  );
}

export default AnimeDetailsPage;
