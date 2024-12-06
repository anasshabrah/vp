// components/Logo.jsx

import Link from 'next/link';
import Image from "next/image";
import PropTypes from 'prop-types';

const Logo = ({ variant = "light", className = "" }) => {
    return (
        <Link href="/" className={`leading-0 inline-block ${className}`}>
            <Image
                width={126}
                height={70}
                src={`/images/logo-${variant}.png`}
                alt="Logo"
            />
        </Link>
    );
};

// Optional: If you still want type checking with PropTypes
Logo.propTypes = {
    variant: PropTypes.string,
    className: PropTypes.string,
};

export default Logo;
