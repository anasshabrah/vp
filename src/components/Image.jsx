// /src/components/Image.jsx

import React from 'react';
import PropTypes from "prop-types";

const Image = React.forwardRef(({ src, alt, onClick, style, ...props }, ref) => (
    <img
        src={src}
        alt={alt}
        onClick={onClick}
        style={{
            objectFit: 'contain', // Ensures the image scales properly
            ...style, // Merge any additional styles passed via props
        }}
        className="transition-transform duration-300 ease-in-out transform cursor-pointer select-none"
        ref={ref}
        {...props}
        draggable={false} // Prevent default drag behavior
    />
));

Image.displayName = 'Image';

Image.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    style: PropTypes.object,
};

export default Image;
