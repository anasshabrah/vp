// /src/components/Shape.jsx

const Shape = ({ className, fillColor }) => {
    const pathData = "M0,60 C300,120 600,0 900,60 C1200,120 1500,0 1920,60 L1920,150 L0,150 Z";

    return (
        <div className={`absolute left-0 bottom-0 w-full ${className ?? ""}`}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1920 150"
                preserveAspectRatio="none"
            >
                <path
                    d={pathData}
                    fill={fillColor ?? "#ffffff"}
                />
            </svg>
        </div>
    );
};

export default Shape;
