// src/components/PortfolioItem.jsx

import React, { useState, Suspense } from "react";
import Image from "next/image"; 
import dynamic from "next/dynamic";

// Dynamically import ImageModal to enable code-splitting
const ImageModal = dynamic(() => import("./ImageModal"), {
  suspense: true,
  ssr: false, // Ensure it's only loaded on the client-side
});

const PortfolioItem = ({ product }) => {
  const { model, name, images, description, specifications } = product;
  const [modalImage, setModalImage] = useState(null);

  const openModal = (imageSrc) => setModalImage(imageSrc);
  const closeModal = () => setModalImage(null);

  const handleDownload = () => {
    const csvRows = [];

    // Determine if specifications are in array format or key-value pairs
    if (Array.isArray(specifications)) {
      // Assume array of objects for table-like specifications
      if (specifications.length > 0 && typeof specifications[0] === "object") {
        // Extract headers from keys of the first object
        const headers = Object.keys(specifications[0]);
        csvRows.push(headers.join(","));

        specifications.forEach((spec) => {
          const row = headers.map((header) => `"${spec[header] || ""}"`);
          csvRows.push(row.join(","));
        });
      } else {
        // If array of strings or other types
        csvRows.push("Specifications");
        specifications.forEach((spec) => {
          csvRows.push(`"${spec}"`);
        });
      }
    } else if (typeof specifications === "object") {
      // Key-Value pairs
      csvRows.push("Specification,Value");

      for (const [key, value] of Object.entries(specifications)) {
        if (Array.isArray(value)) {
          csvRows.push(`"${key.replace(/_/g, " ")}","${value.join("; ")}"`);
        } else {
          csvRows.push(`"${key.replace(/_/g, " ")}","${value}"`);
        }
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
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      {/* Product Title */}
      <h3 className="text-2xl font-heading tracking-normal text-dark pb-4">
        {name} ({model})
      </h3>

      {/* Images Row - Using Next.js Image with Lazy Loading */}
      <div className="flex flex-wrap gap-4">
        {images.map((imageSrc, index) => (
          <div
            key={index}
            className="relative rounded-md overflow-hidden border border-gray-300 hover:drop-shadow-portfolio aspect-square flex-1 min-w-[150px] transition-shadow duration-400"
          >
            <Image
              src={imageSrc}
              alt={`${name} - ${index + 1}`}
              onClick={() => openModal(imageSrc)}
              layout="responsive"
              width={300}
              height={300}
              loading="lazy" // Enable lazy loading
              placeholder="blur" // Show a placeholder while loading
              blurDataURL="/placeholder.png" // Path to a small placeholder image
              className="cursor-pointer object-contain"
              // Adding role and tabIndex for accessibility
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === 'Enter') openModal(imageSrc);
              }}
            />
          </div>
        ))}
      </div>

      {/* Description */}
      {description && (
        <div className="mt-6">
          <h4 className="text-xl font-semibold mb-2">Description</h4>
          <p className="text-gray-700">{description}</p>
        </div>
      )}

      {/* Specifications Section */}
      <div className="mt-8">
        <h4 className="text-xl font-semibold mb-4">Specifications</h4>
        <button
          onClick={handleDownload}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Download Specifications
        </button>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <tbody>
              {Array.isArray(specifications) ? (
                specifications.length > 0 && typeof specifications[0] === "object" ? (
                  // Table format for array of objects
                  <>
                    <thead>
                      <tr>
                        {Object.keys(specifications[0]).map((key) => (
                          <th key={key} className="py-2 px-4 border-b text-left">
                            {key.replace(/_/g, " ").toUpperCase()}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {specifications.map((spec, idx) => (
                        <tr key={idx} className="text-center">
                          {Object.values(spec).map((value, i) => (
                            <td key={i} className="py-2 px-4 border-b">
                              {value}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </>
                ) : (
                  // List format for array of strings or other types
                  <>
                    {specifications.map((spec, idx) => (
                      <tr key={idx} className="text-left">
                        <td className="py-2 px-4 border-b" colSpan="2">
                          {spec}
                        </td>
                      </tr>
                    ))}
                  </>
                )
              ) : (
                // Key-Value format for object specifications
                Object.entries(specifications).map(([key, value]) => (
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
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Image Modal */}
      {modalImage && (
        <Suspense fallback={<div>Loading...</div>}>
          <ImageModal src={modalImage} alt={`${name}`} onClose={closeModal} />
        </Suspense>
      )}
    </div>
  );
};

export default PortfolioItem;
