// React
import React, { useEffect } from "react";
// Recoil
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  emailsListAtom,
  favoriteEmailsAtom,
  filteredEmailsAtom,
  readEmailsAtom,
  selectedEmailAtom,
  selectedFilterAtom,
} from "./recoil";
// Types
import { IEmailData, SelectedFilterTypes } from "@/types";

const Filters: React.FC = () => {
  // Recoil States
  const [selectedFilter, setSelectedFilter] =
    useRecoilState(selectedFilterAtom);
  const setFilteredEmails = useSetRecoilState(filteredEmailsAtom);
  const setselectedEmail = useSetRecoilState(selectedEmailAtom);
  const emailsList = useRecoilValue(emailsListAtom);
  const readEmails = useRecoilValue(readEmailsAtom);
  const favoriteEmails = useRecoilValue(favoriteEmailsAtom);

  // Pre-defined style variable to avoid repetition.
  const selectedFilterStyles =
    "text-text-color font-semibold border-2 border-border-color bg-filter-button-color";

  const handleFilterChange = (key: SelectedFilterTypes | null) => {
    switch (key) {
      case "Read": {
        const emails: IEmailData[] = emailsList.filter((email) =>
          readEmails.includes(email.id)
        );
        setFilteredEmails(emails);
        break;
      }
      case "UnRead": {
        const emails: IEmailData[] = emailsList.filter(
          (email) => !readEmails.includes(email.id)
        );
        setFilteredEmails(emails);
        break;
      }
      case "Favorite": {
        const emails: IEmailData[] = emailsList.filter((email) =>
          favoriteEmails.includes(email.id)
        );
        setFilteredEmails(emails);
        break;
      }
      default: {
        setSelectedFilter(null);
        setFilteredEmails([...emailsList]);
      }
    }
  };

  useEffect(() => {
    setselectedEmail(null);
    handleFilterChange(selectedFilter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFilter]);

  // To handle an edge case where if we have selected Favorite filter and we removed an email from favorite then it should re-comupte the value of filtered emails.
  useEffect(() => {
    if (selectedFilter === "Favorite") {
      setselectedEmail(null);
      handleFilterChange(selectedFilter);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favoriteEmails]);

  return (
    <>
      <span className="cursor-default mr-6">Filter By:</span>
      <button
        onClick={() =>
          selectedFilter === "UnRead"
            ? setSelectedFilter(null)
            : setSelectedFilter("UnRead")
        }
        className={`ml-1 px-4 pb-1 rounded-full ${
          selectedFilter === "UnRead" && selectedFilterStyles
        }`}
      >
        Unread
      </button>
      <button
        onClick={() =>
          selectedFilter === "Read"
            ? setSelectedFilter(null)
            : setSelectedFilter("Read")
        }
        className={`ml-1 px-4 pb-1 rounded-full ${
          selectedFilter === "Read" && selectedFilterStyles
        }`}
      >
        Read
      </button>
      <button
        onClick={() =>
          selectedFilter === "Favorite"
            ? setSelectedFilter(null)
            : setSelectedFilter("Favorite")
        }
        className={`ml-1 px-4 pb-1 rounded-full ${
          selectedFilter === "Favorite" && selectedFilterStyles
        }`}
      >
        Favorites
      </button>
    </>
  );
};

export default Filters;
