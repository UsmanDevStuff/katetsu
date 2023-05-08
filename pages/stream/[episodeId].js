import React from "react";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import MainLayout from "../../components/layout/MainLayout";
import VideoPlayer from "../../components/Player/VideoPlayer";
import { getStreamLink } from "../../src/handlers";
import { HiOutlineDownload } from "react-icons/hi";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { FcVlc } from "react-icons/fc";
import { BsFillPlayFill } from "react-icons/bs";

export const getServerSideProps = async (context) => {
  const streamdetails = await getStreamLink(context.query.episodeId);

  return {
    props: {
      streamdetails,
    },
  };
};

function StreamingPage({ streamdetails }) {

  const [isExternalPlayer, setIsExternalPlayer] = React.useState(true);

  let episodeId = "";
  if (typeof window !== "undefined") {
    episodeId = window.location.pathname.split("/")[2];
  }

  console.log(streamdetails);

  const handleExternalPlayer = () => {
    window.open(streamdetails?.Referer, "_blank");
  };

  const handleVLCPlayer = () => {
    window.open(
      `intent:${streamdetails?.sources[0].file}#Intent;scheme=vlc;package=org.videolan.vlc;end`,
      "_blank"
    );
  };
  const handleMxPlayer = () => {
    //
    window.open(
      `intent:${streamdetails?.sources[0].file}#Intent;scheme=mxplayer;package=com.mxtech.videoplayer.ad;end`,
      "_blank"
    );
  };
  return (
    <MainLayout>
      {streamdetails && (
        <div className=" lg:flex lg:space-x-4">
          <div className=" alignfull w-full overflow-hidden max-w-screen-xl">
            {isExternalPlayer ? (
              <iframe
                className=" overflow-hidden aspect-[5/4]   sm:aspect-video w-full h-full"
                src={streamdetails.Referer}
                allowFullScreen
                frameborder="0"
              ></iframe>
            ) : (
              <VideoPlayer videoSource={streamdetails?.sources[0].file} />
            )}

            <div className="  hidden sm:block mt-5">
              <h3 className="  capitalize ">{episodeId}</h3>
            </div>
          </div>
          <div className=" sm:hidden  mt-5">
            <h3 className=" capitalize ">{episodeId}</h3>
          </div>

          <div className=" mt-5 lg:mt-0 space-y-4">
            {isExternalPlayer ? (
              <PrimaryButton
                icon={<BsFillPlayFill />}
                onClick={() => setIsExternalPlayer(!isExternalPlayer)}
              >
                Use Internal player
              </PrimaryButton>
            ) : (
              <PrimaryButton
                icon={<HiOutlineDownload />}
                sub="Download option available"
                onClick={() => setIsExternalPlayer(!isExternalPlayer)}
              >
                Use External player
              </PrimaryButton>
            )}

            <PrimaryButton
              icon={<BsFillPlayCircleFill />}
              onClick={handleMxPlayer}
              sub="Android (Experimental)"
            >
              Open in MX Player
            </PrimaryButton>
            <PrimaryButton
              sub="Android (Experimental)"
              icon={<FcVlc />}
              onClick={handleVLCPlayer}
            >
              Open in VLC
            </PrimaryButton>
          </div>
        </div>
      )}
    </MainLayout>
  );
}

export default StreamingPage;
