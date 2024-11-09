// /src/components/PortfolioItem.jsx

import React, { useState } from "react";
import Image from "./Image";
import ImageModal from "./ImageModal";

const PortfolioItem = ({ product }) => {
    const { type, color, images, parameters } = product;
    const [modalImage, setModalImage] = useState(null);

    const openModal = (imageSrc) => setModalImage(imageSrc);
    const closeModal = () => setModalImage(null);

    const handleDownload = () => {
        const csvContent = [
            [
                "Part #",
                "Size",
                "Pitch Circle Diameter",
                "Offset",
                "Center Bore",
                "Load",
                "Weight (Kg)",
                "Bolts (Faux)"
            ],
            ...parameters.map((param) => [
                param.part_number,
                param.size,
                param.pitch_circle_diameter,
                param.offset,
                param.center_bore,
                param.load,
                param.weight_kg,
                param.bolts_faux
            ])
        ]
            .map((e) => e.join(","))
            .join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${type}-${color}-specifications.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            {/* Product Title */}
            <h3 className="text-2xl font-heading tracking-normal text-dark pb-4">
                {type} - {color}
            </h3>

            {/* Images Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {images.map((imageSrc, index) => (
                    <div
                        key={index}
                        className="relative duration-300 rounded-md overflow-hidden hover:drop-shadow-portfolio aspect-square"
                    >
                        <Image
                            src={imageSrc}
                            alt={`${type} - ${color} - ${index + 1}`}
                            onClick={() => openModal(imageSrc)}
                        />
                    </div>
                ))}
            </div>

            {/* Specifications Section */}
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
                <ImageModal
                    src={modalImage}
                    alt={`${type} - ${color}`}
                    onClose={closeModal}
                />
            )}
        </div>
    );
};

export default PortfolioItem;
