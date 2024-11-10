// /src/components/HeroArea.jsx

import React from "react";
import Shape from "./Shape";

const heroBg = "/images/hero-bg.jpg";

const HeroArea = () => {
    return (
        <section
            id="hero"
            style={{ backgroundImage: `url(${heroBg})` }}
            className="
                relative
                bg-cover
                bg-no-repeat
                bg-center
                h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] xl:h-[90vh]
                flex
                flex-col
                justify-end
                text-center
                pb-8 sm:pb-12 md:pb-16
                overflow-hidden
            "
        >
            <div className="container px-4">
                <div className="mt-8 font-light">
                    <h1 className="text-white font-light text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-none transform -translate-y-8">
                        LANDER Wheels
                    </h1>
                </div>
            </div>

            {/* Adjust the visibility and positioning of the Shape component based on screen size */}
            <Shape className="hidden md:block absolute bottom-0 left-0 right-0" />
        </section>
    );
};

export default HeroArea;
