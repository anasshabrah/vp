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

    const { images, parameters } = colors[activeColor];

    const handleDownload = () => {
        const csvContent = [
            ["Part #", "Size", "Pitch Circle Diameter", "Offset", "Center Bore", "Load", "Weight (Kg)", "Beadlock Rings", "Bolts (Faux)"],
            ...parameters.map(param => [
                param.part_number,
                param.size,
                param.pitch_circle_diameter,
                param.offset,
                param.center_bore,
                param.load,
                param.weight_kg,
                param.beadlock_rings,
                param.bolts_faux
            ])
        ].map(e => e.join(",")).join("\n");

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${type}-${activeColor}-specifications.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

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

            {/* Images Grid */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-7">
                {images.map((imageSrc, index) => (
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

            {/* Parameters Section */}
            <div className="mt-8">
                <h4 className="text-xl font-semibold mb-4">Specifications</h4>
                <button
                    onClick={handleDownload}
                    className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Download Specifications
                </button>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b">Part #</th>
                                <th className="py-2 px-4 border-b">Size</th>
                                <th className="py-2 px-4 border-b">Pitch Circle Diameter</th>
                                <th className="py-2 px-4 border-b">Offset</th>
                                <th className="py-2 px-4 border-b">Center Bore</th>
                                <th className="py-2 px-4 border-b">Load</th>
                                <th className="py-2 px-4 border-b">Weight (Kg)</th>
                                <th className="py-2 px-4 border-b">Beadlock Rings</th>
                                <th className="py-2 px-4 border-b">Bolts (Faux)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {parameters.map((param) => (
                                <tr key={param.part_number} className="text-center">
                                    <td className="py-2 px-4 border-b">{param.part_number}</td>
                                    <td className="py-2 px-4 border-b">{param.size}</td>
                                    <td className="py-2 px-4 border-b">{param.pitch_circle_diameter}</td>
                                    <td className="py-2 px-4 border-b">{param.offset}</td>
                                    <td className="py-2 px-4 border-b">{param.center_bore}</td>
                                    <td className="py-2 px-4 border-b">{param.load}</td>
                                    <td className="py-2 px-4 border-b">{param.weight_kg}</td>
                                    <td className="py-2 px-4 border-b">
                                        {param.beadlock_rings === "YES" ? (
                                            <span className="px-2 py-1 bg-green-200 text-green-800 rounded-full text-xs">
                                                Yes
                                            </span>
                                        ) : (
                                            <span className="px-2 py-1 bg-red-200 text-red-800 rounded-full text-xs">
                                                No
                                            </span>
                                        )}
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        {param.bolts_faux === "YES" ? (
                                            <span className="px-2 py-1 bg-green-200 text-green-800 rounded-full text-xs">
                                                Yes
                                            </span>
                                        ) : (
                                            <span className="px-2 py-1 bg-red-200 text-red-800 rounded-full text-xs">
                                                No
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Image Modal */}
            {modalImage && (
                <ImageModal src={modalImage} alt={`${type} - ${activeColor}`} onClose={closeModal} />
            )}
        </div>
    );

};

export default PortfolioType;
