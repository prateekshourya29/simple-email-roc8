// React
import React from "react";
// Recoil
import { useRecoilState } from "recoil";
import { currentPageNumberAtom } from "./recoil";

interface IProps {
  totalPages: number;
}

const Pagination: React.FC<IProps> = ({ totalPages }: IProps) => {
  // Recoil States
  const [currentPageNumber, setCurrentPageNumber] = useRecoilState(
    currentPageNumberAtom
  );

  // Local variables
  const decreaseButtonDisabled = currentPageNumber === 1;
  const increaceButtonDisabled = currentPageNumber === totalPages;

  return (
    <div className="mx-4 flex">
      <button
        onClick={() => setCurrentPageNumber(currentPageNumber - 1)}
        disabled={decreaseButtonDisabled}
        className={`w-7 h-7 rounded-full hover:bg-filter-button-color ${
          decreaseButtonDisabled && "cursor-not-allowed opacity-30"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </button>
      <div className="w-7 h-7 mx-2 flex justify-center items-center bg-accent-color text-white font-semibold rounded-full cursor-default">
        {currentPageNumber}
      </div>
      <button
        onClick={() => setCurrentPageNumber(currentPageNumber + 1)}
        disabled={increaceButtonDisabled}
        className={`w-7 h-7 rounded-full hover:bg-filter-button-color ${
          increaceButtonDisabled && "cursor-not-allowed opacity-30"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 12 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
