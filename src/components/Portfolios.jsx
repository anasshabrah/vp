// /src/components/Portfolios.jsx

import React from "react";
import Shape from "./Shape";
import PortfolioItem from "./PortfolioItem";
import ValvePortfolioItem from "./ValvePortfolioItem";
import SectionTitle from "./SectionTitle";
import wheelPortfolios from "../data/wheelPortfolios.json";
import valvePortfolios from "../data/valvePortfolios.json";

const Portfolios = () => {
    return (
        <section
            className="bg-gray-50 relative pt-24 pb-24 lg:pb-48"
            id="portfolio"
        >
            <div className="container mx-auto px-4">
                {/* Wheels Section */}
                <SectionTitle title="Wheels Portfolio" />

                {/* Vertical Stack of Wheel Portfolio Items */}
                <div className="space-y-12">
                    {wheelPortfolios.map((product) => (
                        <PortfolioItem
                            key={`wheel-${product.id}`}
                            product={product}
                        />
                    ))}
                </div>

                {/* Valves Section */}
                <SectionTitle title="Valves Portfolio" className="mt-24" />

                {/* Vertical Stack of Valve Portfolio Items */}
                <div className="space-y-12">
                    {valvePortfolios.map((product) => (
                        <ValvePortfolioItem
                            key={`valve-${product.id}`}
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
