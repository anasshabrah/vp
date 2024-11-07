// /components/Portfolios.jsx

import Shape from "./Shape";
import PortfolioType from "./PortfolioType";
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

                {wheelPortfolios.map((portfolioType) => (
                    <PortfolioType
                        key={portfolioType.id}
                        type={portfolioType.type}
                        colors={portfolioType.colors}
                    />
                ))}
            </div>

            <Shape />
        </section>
    );
};

export default Portfolios;
