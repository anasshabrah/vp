// pages/_app.jsx

import Head from "next/head";
import '../styles/globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Rokstar = ({ Component, pageProps }) => {
    return (
        <>
            <Head>
                <title>LANDER Wheels | Built For Speed, Crafted For Control</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta charSet="UTF-8" />
                <meta name="description" content="Established in 2007, Lander Wheels is a leading innovator in high-performance wheels for off-road, street, and track applications." />
                <meta name="robots" content="index, follow" />
                
                {/* Canonical URL */}
                <link rel="canonical" href="https://landerwheels.com" />
                
                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:title" content="LANDER Wheels | Built For Speed, Crafted For Control" />
                <meta property="og:description" content="Lander Wheels has led wheel innovation since 2007, delivering performance and quality in wheels for off-road, street, and track use. From passenger cars to UTVs, rely on Lander for cutting-edge technology and superior fitment." />
                <meta property="og:image" content="/images/logo-dark.png" />
                <meta property="og:url" content="https://landerwheels.com" />
                <meta property="og:site_name" content="LANDER Wheels" />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="LANDER Wheels | Built For Speed, Crafted For Control" />
                <meta name="twitter:description" content="Leading innovator in wheel design and manufacturing since 2007, Lander Wheels specializes in performance wheels for off-road, street, and track use, known for quality and advanced technology." />
                <meta name="twitter:image" content="/images/logo-dark.png" />
                <meta name="twitter:site" content="@LANDERWheels" />

                {/* Structured Data for SEO */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "http://schema.org",
                        "@type": "Organization",
                        "name": "LANDER Wheels",
                        "url": "https://landerwheels.com",
                        "logo": "https://landerwheels.com/images/logo-dark.png",
                        "sameAs": [
                            "https://www.instagram.com/landerwheels/"
                        ],
                        "description": "Established in 2007, Lander Wheels is a leading innovator in the design and manufacturing of wheels for off-road, street, and track applications. Known for its commitment to performance and quality.",
                        "contactPoint": {
                            "@type": "ContactPoint",
                            "telephone": "+1-610-234-7490",
                            "contactType": "Customer Service",
                            "areaServed": "US",
                            "availableLanguage": ["en"]
                        },
                        "address": {
                            "@type": "PostalAddress",
                            "streetAddress": "30 N Gould St.",
                            "addressLocality": "Sheridan",
                            "addressRegion": "WY",
                            "postalCode": "82801",
                            "addressCountry": "US"
                        },
                        "foundingDate": "2007"
                    })}
                </script>
            </Head>
            <Component {...pageProps} />
            <ToastContainer 
                position="top-right" 
                autoClose={5000} 
                hideProgressBar={false} 
                newestOnTop={false} 
                closeOnClick 
                rtl={false} 
                pauseOnFocusLoss 
                draggable 
                pauseOnHover 
                theme="light" 
            />
        </>
    );
};

export default Rokstar;
