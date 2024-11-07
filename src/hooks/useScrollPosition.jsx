// hooks/useScrollPosition.js

import { useEffect, useState } from "react";

const useScrollPosition = () => {
    const [position, setPosition] = useState(0);

    useEffect(() => {
        let timeoutId = null;

        const handleScroll = () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            timeoutId = setTimeout(() => {
                setPosition(window.scrollY);
            }, 100); // Adjust the timeout as needed
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, []);

    return { position };
};

export default useScrollPosition;
