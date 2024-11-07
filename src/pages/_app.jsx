// pages/_app.jsx

import Head from "next/head";
import '../styles/globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Rokstar = ({ Component, pageProps }) => {
    return (
        <>
            <Head>
                <title>Rokstar :: React Portfolio Template</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta charSet="UTF-8" />
                {/* Add other meta tags as needed */}
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
