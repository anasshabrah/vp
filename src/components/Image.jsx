// /src/components/Image.jsx

import React from 'react';
import PropTypes from "prop-types";

const Image = React.forwardRef(({ src, alt, onClick, style, ...props }, ref) => (
    <img
        src={src}
        alt={alt}
        onClick={onClick}
        style={{
            objectFit: 'cover',
            ...style,
        }}
        className="transition-transform duration-300 ease-in-out transform cursor-pointer select-none w-full h-full"
        ref={ref}
        {...props}
        draggable={false}
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
