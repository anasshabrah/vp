import Image from "./Image";
import Link from "next/link";
import {useState} from "react";
import dynamic from 'next/dynamic';
import {VscPlayCircle} from "react-icons/vsc";
import getRootDomain from "../utils/getRootDomain";
import getVimeoVideoId from "../utils/getVimeoVideoId";
import getYoutubeVideoId from "../utils/getYoutubeVideoId";

const ModalVideo = dynamic(() => import('react-modal-video'), {ssr: false});

const Portfolio = ({title, thumb, featuredVideo, videoLink}) => {
    const [isOpen, setOpen] = useState(false);
    let channel, videoId;

    if (featuredVideo) {
        channel = getRootDomain(videoLink);
        if (channel === "youtube") {
            videoId = getYoutubeVideoId(videoLink);
        }

        if (channel === "vimeo") {
            videoId = getVimeoVideoId(videoLink);
        }
    }

    return (
        <>
            <div
                className={`relative duration-400 rounded-md overflow-hidden hover:drop-shadow-portfolio ${featuredVideo ? bgOverlay : ""}`}
            >
                <Link href="/">
                    <a>
                        <Image
                            src={thumb}
                            alt={title}
                        />
                    </a>
                </Link>
                {featuredVideo && (
                    <button
                        className="absolute inset-0 text-6xl text-white w-full z-10"
                        onClick={() => setOpen(true)}
                    >
                        <VscPlayCircle className="inline"/>
                    </button>
                )}
            </div>

            {featuredVideo && (
                <ModalVideo
                    autoplay
                    isOpen={isOpen}
                    channel={channel}
                    videoId={videoId}
                    onClose={() => setOpen(false)}
                />
            )}
        </>
    );
};

const bgOverlay = "after:absolute after:bg-black after:inset-0 after:opacity-0 after:duration-400 hover:after:opacity-30";

export default Portfolio;
