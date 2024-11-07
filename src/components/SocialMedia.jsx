import about from "../data/about.json";
import * as FontAwesome from "react-icons/fa";

const SocialMedia = ({className}) => {
    return (
        <div className={`flex items-center ${className ?? ""}`}>
            <h5 className="text-base mr-5 leading-none">Follow Us</h5>
            <ul className="flex space-x-4">
                {about.socialMedia.map(media => {
                    const Icon = FontAwesome[media.icon];
                    return (
                        <li key={media.id}><a href={media.link} target="_blank" rel="noopener"><Icon/></a></li>
                    )
                })}
            </ul>
        </div>
    );
};

export default SocialMedia;
