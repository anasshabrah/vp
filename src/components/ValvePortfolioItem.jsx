// /src/components/ValvePortfolioItem.jsx

import React, { useState } from "react";
import Image from "./Image";
import ImageModal from "./ImageModal";

const ValvePortfolioItem = ({ product }) => {
    const { model, name, images, description, specifications } = product;
    const [modalImage, setModalImage] = useState(null);

    const openModal = (imageSrc) => setModalImage(imageSrc);
    const closeModal = () => setModalImage(null);

    const handleDownload = () => {
        const { specifications } = product;
        const csvRows = [];

        // Headers
        csvRows.push("Specification,Value");

        // Add specifications
        for (const [key, value] of Object.entries(specifications)) {
            if (Array.isArray(value)) {
                csvRows.push(`${key},${value.join("; ")}`);
            } else {
                csvRows.push(`${key},${value}`);
            }
        }

        const csvContent = csvRows.join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${model}-specifications.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            {/* Product Title */}
            <h3 className="text-2xl font-heading tracking-normal text-dark pb-4">
                {name} ({model})
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
                            alt={`${name} - ${index + 1}`}
                            onClick={() => openModal(imageSrc)}
                        />
                    </div>
                ))}
            </div>

            {/* Description */}
            <div className="mt-6">
                <h4 className="text-xl font-semibold mb-2">Description</h4>
                <p className="text-gray-700">{description}</p>
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
                        <tbody>
                            {Object.entries(specifications).map(([key, value]) => (
                                <tr key={key} className="text-left">
                                    <td className="py-2 px-4 border-b font-medium capitalize">
                                        {key.replace(/_/g, " ")}
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        {Array.isArray(value) ? (
                                            <ul className="list-disc list-inside">
                                                {value.map((feature, idx) => (
                                                    <li key={idx}>{feature}</li>
                                                ))}
                                            </ul>
                                        ) : (
                                            value
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
                    alt={`${name}`}
                    onClose={closeModal}
                />
            )}
        </div>
    );
};

export default ValvePortfolioItem;
