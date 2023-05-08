import axios from "axios";
const BASEURL = "https://gogoanime.riqexpe.eu.org";
export const getPopularAnime = async () => {
  const { data } = await axios.get(`${BASEURL}/popular`);
  return data;
};

export const getAnimeSearch = async (search) => {
  const { data } = await axios.get(`${BASEURL}/search?keyw=${search}`);
  return data;
};

// export const getTopAiringAnime = async () => {
//   const { data } = await axios.get(`${BASEURL}/top-airing`);
//   return data;
// };

export const getAnimeDetails = async (animeId) => {
  const { data } = await axios.get(`${BASEURL}/anime-details/${animeId}`);
  return data;
};

export const getStreamLink = async (episodeId) => {
  const { data } = await axios.get(`${BASEURL}/vidcdn/watch/${episodeId}`);
  return data;
};
