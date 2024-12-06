// src/components/Portfolios.jsx

import React from "react";
import Shape from "./Shape";
import PortfolioItem from "./PortfolioItem";
import SectionTitle from "./SectionTitle";

// Import portfolio data for new categories
import campingPortfolios from "../data/campingPortfolios.json";
import performancePortfolios from "../data/performancePortfolios.json";
import interiorPortfolios from "../data/interiorPortfolios.json";
import lightsPortfolios from "../data/lightsPortfolios.json";
// Add imports for other categories as needed

const Portfolios = ({ categoryId }) => {
  let portfolios = [];

  switch (categoryId) {
    case "camping":
      portfolios = campingPortfolios;
      break;
    case "performance":
      portfolios = performancePortfolios;
      break;
    case "interior":
      portfolios = interiorPortfolios;
      break;
    case "lights":
      portfolios = lightsPortfolios;
      break;
    // Add more cases for different categories as needed
    default:
      portfolios = [];
  }

  if (portfolios.length === 0) {
    return (
      <section
        className="bg-gray-50 relative pt-24 pb-24 lg:pb-48"
        id="portfolio"
      >
        <div className="container mx-auto px-4">
          <p>No portfolios available for this category.</p>
        </div>
      </section>
    );
  }

  return (
    <section
      className="bg-gray-50 relative pt-24 pb-24 lg:pb-48"
      id="portfolio"
    >
      <div className="container mx-auto px-4">
        <SectionTitle
          title={`${categoryId.charAt(0).toUpperCase() + categoryId.slice(1)} Portfolio`}
        />
        <div className="space-y-12">
          {portfolios.map((product) => (
            <PortfolioItem key={`${categoryId}-${product.id}`} product={product} />
          ))}
        </div>
      </div>
      <Shape />
    </section>
  );
};

export default Portfolios;
