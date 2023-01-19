// React
import React from "react";
// Lottie
import lottie from "lottie-web";
// Lottie Animation File
import loader from "../public/loader.json";

interface IProps {
  className?: string;
}

const Loader: React.FC<IProps> = ({ className }: IProps) => {
  const loaderElement = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (loaderElement.current) {
      const instance = lottie.loadAnimation({
        container: loaderElement.current,
        animationData: loader,
      });
      return () => instance.destroy();
    }
  }, []);

  return (
    <div className="mx-auto w-full h-[70vh] flex flex-col items-center justify-center text-xl font-semibold text-accent-color">
      <div
        style={{ color: "black", fill: "black", stroke: "black" }}
        className={`w-1/4 ${className}`}
      >
        <div ref={loaderElement} id="loader" />
      </div>
      <div className="cursor-default">
        Data is getting loaded! Please wait...
      </div>
    </div>
  );
};

export default Loader;
