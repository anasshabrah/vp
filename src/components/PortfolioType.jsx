// /src/components/PortfolioType.jsx

import { useState } from "react";
import Image from "./Image";
import ImageModal from "./ImageModal";

const PortfolioType = ({ type, colors }) => {
    const colorNames = Object.keys(colors);
    const [activeColor, setActiveColor] = useState(colorNames[0]);
    const [modalImage, setModalImage] = useState(null);

    const openModal = (imageSrc) => setModalImage(imageSrc);
    const closeModal = () => setModalImage(null);

    return (
        <div className="mb-16">
            <h3 className="text-2xl font-heading tracking-normal text-dark pb-4">
                {type}
            </h3>
            <nav className="mb-6 space-x-5">
                {colorNames.map((color) => (
                    <button
                        key={color}
                        onClick={() => setActiveColor(color)}
                        className={`text-black capitalize font-medium relative focus:outline-none ${
                            activeColor === color
                                ? "after:absolute after:h-1.5 after:w-1.5 after:rounded-full after:bg-slate-700 after:left-1/2 after:-translate-x-1/2 after:-bottom-1"
                                : ""
                        }`}
                    >
                        {color}
                    </button>
                ))}
            </nav>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-7">
                {colors[activeColor].map((imageSrc, index) => (
                    <div
                        key={index}
                        className="relative duration-300 rounded-md overflow-hidden hover:drop-shadow-portfolio aspect-square"
                    >
                        <Image
                            src={imageSrc}
                            alt={`${type} - ${activeColor} - ${index + 1}`}
                            onClick={() => openModal(imageSrc)}
                        />
                    </div>
                ))}
            </div>

            {modalImage && (
                <ImageModal src={modalImage} alt={`${type} - ${activeColor}`} onClose={closeModal} />
            )}
        </div>
    );
};

export default PortfolioType;
