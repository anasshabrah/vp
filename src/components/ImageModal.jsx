import { useEffect, useState, useRef } from "react";
import Image from "./Image"; // Ensure this component correctly forwards props

const ImageModal = ({ src, alt, onClose }) => {
    const [scale, setScale] = useState(1); // State to manage zoom scale
    const [initialScale, setInitialScale] = useState(1); // State to store the initial fit scale
    const containerRef = useRef(null);
    const imgRef = useRef(null);
    
    // Refs for panning
    const isDragging = useRef(false);
    const origin = useRef({ x: 0, y: 0 });
    const translate = useRef({ x: 0, y: 0 });
    const animationFrame = useRef(null);

    // Refs for image and container dimensions
    const imgDimensions = useRef({ width: 0, height: 0 });
    const containerDimensions = useRef({ width: 0, height: 0 });

    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleEsc);

        // Prevent background scrolling when modal is open
        document.body.style.overflow = "hidden";

        const handleResize = () => {
            if (imgRef.current && containerRef.current) {
                const imgRect = imgRef.current.getBoundingClientRect();
                imgDimensions.current = {
                    width: imgRect.width,
                    height: imgRect.height,
                };
                const containerRect = containerRef.current.getBoundingClientRect();
                containerDimensions.current = {
                    width: containerRect.width,
                    height: containerRect.height,
                };
                calculateInitialScale();
                constrainTranslate();
            }
        };

        // Initial dimension capture after image loads
        window.addEventListener("resize", handleResize);

        return () => {
            document.removeEventListener("keydown", handleEsc);
            document.body.style.overflow = "auto";
            if (animationFrame.current) {
                cancelAnimationFrame(animationFrame.current);
            }
            window.removeEventListener("resize", handleResize);
        };
    }, [onClose]);

    const handleClose = () => {
        onClose();
    };

    const calculateInitialScale = () => {
        const { width: imgWidth, height: imgHeight } = imgDimensions.current;
        const { width: contWidth, height: contHeight } = containerDimensions.current;

        const scaleX = contWidth / imgWidth;
        const scaleY = contHeight / imgHeight;
        const fitScale = Math.min(scaleX, scaleY, 1); // Ensure not to scale up initially

        setScale(fitScale);
        setInitialScale(fitScale);
        translate.current = { x: 0, y: 0 };
        updateTransform();
    };

    const zoomIn = () => {
        setScale((prev) => {
            const newScale = Math.min(prev + 0.2, 3);
            return newScale;
        });
    };

    const zoomOut = () => {
        setScale((prev) => {
            const newScale = Math.max(prev - 0.2, initialScale);
            return newScale;
        });

        // Reset translation when zooming out to initial scale
        if (scale - 0.2 <= initialScale) {
            translate.current = { x: 0, y: 0 };
            updateTransform();
        } else {
            constrainTranslate();
        }
    };

    const handleWheel = (e) => {
        e.preventDefault();
        if (e.deltaY < 0) {
            zoomIn();
        } else {
            zoomOut();
        }
    };

    const handleMouseDown = (e) => {
        if (scale > initialScale) { // Allow dragging only if zoomed in beyond initial scale
            isDragging.current = true;
            origin.current = {
                x: e.clientX - translate.current.x,
                y: e.clientY - translate.current.y,
            };
            containerRef.current.style.cursor = "grabbing";
        }
    };

    const handleMouseMove = (e) => {
        if (!isDragging.current) return;

        // Use requestAnimationFrame for smoother updates
        if (animationFrame.current) {
            cancelAnimationFrame(animationFrame.current);
        }

        animationFrame.current = requestAnimationFrame(() => {
            let newX = e.clientX - origin.current.x;
            let newY = e.clientY - origin.current.y;

            // Calculate the maximum translation based on scale and container size
            const maxTranslateX = Math.max((imgDimensions.current.width * scale - containerDimensions.current.width) / 2, 0);
            const maxTranslateY = Math.max((imgDimensions.current.height * scale - containerDimensions.current.height) / 2, 0);

            // Constrain the translation to prevent over-panning
            newX = Math.min(Math.max(newX, -maxTranslateX), maxTranslateX);
            newY = Math.min(Math.max(newY, -maxTranslateY), maxTranslateY);

            translate.current = { x: newX, y: newY };
            updateTransform();
        });
    };

    const handleMouseUp = () => {
        if (isDragging.current) {
            isDragging.current = false;
            containerRef.current.style.cursor = scale > initialScale ? "grab" : "default";
        }
    };

    const handleMouseLeave = () => {
        handleMouseUp();
    };

    useEffect(() => {
        // Update transform whenever scale changes
        updateTransform();
        constrainTranslate();
    }, [scale]);

    const updateTransform = () => {
        if (imgRef.current) {
            imgRef.current.style.transform = `translate(${translate.current.x}px, ${translate.current.y}px) scale(${scale})`;
        }
    };

    const constrainTranslate = () => {
        // Ensure that the current translate is within allowed bounds
        const maxTranslateX = Math.max((imgDimensions.current.width * scale - containerDimensions.current.width) / 2, 0);
        const maxTranslateY = Math.max((imgDimensions.current.height * scale - containerDimensions.current.height) / 2, 0);

        let { x, y } = translate.current;

        x = Math.min(Math.max(x, -maxTranslateX), maxTranslateX);
        y = Math.min(Math.max(y, -maxTranslateY), maxTranslateY);

        translate.current = { x, y };
        updateTransform();
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
            // Removed onClick={handleClose} to prevent closing when clicking on the overlay
        >
            <div
                className="relative max-w-3xl w-full p-4 bg-white rounded-md"
                // Removed onClick={(e) => e.stopPropagation()} since the overlay no longer closes the modal
            >
                <button
                    className="absolute top-3 right-3 text-white text-3xl font-bold z-20 bg-gray-800 bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 focus:outline-none transition"
                    onClick={handleClose}
                    aria-label="Close"
                >
                    &times;
                </button>
                <div
                    className="flex justify-center items-center relative w-full h-96 overflow-hidden cursor-grab"
                    onWheel={handleWheel} // Handle zoom with mouse wheel
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseLeave}
                    ref={containerRef}
                >
                    <Image
                        src={src}
                        alt={alt}
                        className="rounded-md transition-transform duration-300 ease-in-out"
                        style={{
                            transform: `translate(${translate.current.x}px, ${translate.current.y}px) scale(${scale})`,
                            cursor: scale > initialScale ? "grab" : "default",
                            maxWidth: "none",
                            maxHeight: "none",
                            transition: "transform 0.3s ease",
                        }}
                        ref={imgRef}
                        draggable={false} // Prevent default drag behavior
                        onLoad={() => {
                            if (imgRef.current && containerRef.current) {
                                const imgRect = imgRef.current.getBoundingClientRect();
                                imgDimensions.current = {
                                    width: imgRect.width,
                                    height: imgRect.height,
                                };
                                const containerRect = containerRef.current.getBoundingClientRect();
                                containerDimensions.current = {
                                    width: containerRect.width,
                                    height: containerRect.height,
                                };
                                calculateInitialScale();
                            }
                        }}
                    />
                </div>
                {/* Zoom Controls */}
                <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    <button
                        onClick={zoomOut}
                        className={`px-3 py-1 bg-gray-800 bg-opacity-50 text-white rounded hover:bg-opacity-75 focus:outline-none transition ${
                            scale <= initialScale ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        aria-label="Zoom Out"
                        disabled={scale <= initialScale}
                    >
                        -
                    </button>
                    <span className="text-white bg-gray-800 bg-opacity-50 px-3 py-1 rounded">
                        {Math.round((scale / initialScale) * 100)}%
                    </span>
                    <button
                        onClick={zoomIn}
                        className={`px-3 py-1 bg-gray-800 bg-opacity-50 text-white rounded hover:bg-opacity-75 focus:outline-none transition ${
                            scale >= 3 ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        aria-label="Zoom In"
                        disabled={scale >= 3}
                    >
                        +
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ImageModal;
