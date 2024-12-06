// pages/_app.jsx

import Head from "next/head";
import '../styles/globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Rokstar = ({ Component, pageProps }) => {
    return (
        <>
            <Head>
                {/* Primary Meta Tags */}
                <title>VirixPro | Excellence in Performance and Innovation</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta charSet="UTF-8" />
                <meta name="description" content="VirixPro is a leading innovator in high-performance automotive parts and accessories, dedicated to enhancing your vehicle's performance and style." />
                <meta name="robots" content="index, follow" />
                
                {/* Canonical URL */}
                <link rel="canonical" href="https://www.virixpro.com" />
                
                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:title" content="VirixPro | Excellence in Performance and Innovation" />
                <meta property="og:description" content="VirixPro leads the industry with cutting-edge automotive parts and accessories designed for optimal performance and style. From high-performance wheels to advanced lighting solutions, trust VirixPro to elevate your vehicle." />
                <meta property="og:image" content="/images/hero-bg.jpg" />
                <meta property="og:url" content="https://www.virixpro.com" />
                <meta property="og:site_name" content="VirixPro" />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="VirixPro | Excellence in Performance and Innovation" />
                <meta name="twitter:description" content="Leading innovator in automotive parts and accessories, VirixPro specializes in performance enhancements and stylish upgrades for your vehicle." />
                <meta name="twitter:image" content="/images/hero-bg.jpg" />
                <meta name="twitter:site" content="@VirixPro" />

                {/* Structured Data for SEO */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "http://schema.org",
                        "@type": "Organization",
                        "name": "VirixPro",
                        "url": "https://www.virixpro.com",
                        "logo": "https://www.virixpro.com/images/logo-dark.png",
                        "sameAs": [
                            "https://www.instagram.com/virixpro/",
                            "https://www.facebook.com/virixpro/",
                            "https://twitter.com/virixpro"
                        ],
                        "description": "VirixPro is a leading innovator in the design and manufacturing of high-performance automotive parts and accessories. Committed to excellence and quality, VirixPro enhances vehicle performance and aesthetics.",
                        "contactPoint": {
                            "@type": "ContactPoint",
                            "telephone": "+1-800-123-4567",
                            "contactType": "Customer Service",
                            "areaServed": "US",
                            "availableLanguage": ["en"]
                        },
                        "address": {
                            "@type": "PostalAddress",
                            "streetAddress": "1234 Performance Blvd.",
                            "addressLocality": "Detroit",
                            "addressRegion": "MI",
                            "postalCode": "48201",
                            "addressCountry": "US"
                        },
                        "foundingDate": "2010"
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
