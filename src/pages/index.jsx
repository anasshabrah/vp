// pages/index.jsx

import { useEffect, useState } from "react";
import Header from "../components/Header";
import AboutMe from "../components/About";
import Footer from "../components/Footer";
import Contact from "../components/Contact";
import HeroArea from "../components/HeroArea";
import Services from "../components/Services";
import Preloader from "../components/Preloader";
import Portfolios from "../components/Portfolios";

const Home = () => {
    const [preloaded, setPreloaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setPreloaded(true);
        }, 800);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="rokstar">
            <Preloader preloaded={preloaded} />
            <Header />
            <HeroArea />
            <AboutMe />
            <Services />
            <Portfolios />
            <Contact />
            <Footer />
        </div>
    );
};

export default Home;
