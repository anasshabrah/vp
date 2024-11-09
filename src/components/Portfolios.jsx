// /src/components/Portfolios.jsx

import React from "react";
import Shape from "./Shape";
import PortfolioItem from "./PortfolioItem";
import SectionTitle from "./SectionTitle";
import wheelPortfolios from "../data/wheelPortfolios.json";

const Portfolios = () => {
    return (
        <section
            className="bg-gray-50 relative pt-24 pb-24 lg:pb-48"
            id="portfolio"
        >
            <div className="container mx-auto px-4">
                <SectionTitle title="Portfolios" />

                {/* Vertical Stack of Portfolio Items */}
                <div className="space-y-12">
                    {wheelPortfolios.map((product) => (
                        <PortfolioItem
                            key={product.id}
                            product={product}
                        />
                    ))}
                </div>
            </div>

            <Shape />
        </section>
    );
};

export default Portfolios;
