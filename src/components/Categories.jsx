// components/Categories.jsx

import React from "react";
import SectionTitle from "./SectionTitle";
import Link from "next/link";
import categoriesData from "../data/categories.json";

const Categories = () => {
  return (
    <section
      className="bg-gray-50 relative pt-24 pb-24 lg:pb-48"
      id="categories"
    >
      <div className="container mx-auto px-4">
        <SectionTitle title="Categories" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categoriesData.map((category) => (
            <Link
              href={`/categories/${category.id}`}
              key={category.id}
              className="relative bg-cover bg-center rounded-lg shadow-md overflow-hidden group"
              style={{
                backgroundImage: `url('/images/portfolio/${category.image}')`,
              }}
            >
              {/* Overlay for better text readability */}
              <div className="absolute inset-0 bg-black opacity-50 group-hover:opacity-60 transition-opacity duration-300"></div>
              <div className="relative p-6 flex flex-col justify-between h-full">
                <div>
                  {/* Increased font size for category name */}
                  <h3 className="text-3xl md:text-4xl font-heading tracking-normal text-white pb-2">
                    {category.name}
                  </h3>
                  {/* Increased font size for category description */}
                  <p className="text-lg md:text-xl text-gray-200 mb-6">
                    {category.description}
                  </p>
                </div>
                {/* Styled "View Category" as a transparent golden button */}
                <span className="mt-auto inline-block">
                  <span className="px-4 py-2 border border-yellow-400 text-yellow-400 bg-yellow-400 bg-opacity-20 rounded-full transition-all duration-300 hover:bg-opacity-40">
                    View {category.name}
                  </span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
