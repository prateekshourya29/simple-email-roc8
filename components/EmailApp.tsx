// React
import React, { useEffect } from "react";
// Recoil
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  currentPageNumberAtom,
  emailsListAtom,
  filteredEmailsAtom,
  selectedEmailAtom,
  selectedFilterAtom,
} from "./recoil";
// Components
import EmailListCard from "./EmailListCard";
import EmailBody from "./EmailBody";
import Pagination from "./Pagination";
import Loader from "./Loader";
import Filters from "./Filters";

const EmailApp: React.FC = () => {
  // Recoil States
  const currentPageNumber = useRecoilValue(currentPageNumberAtom);
  const [emailsList, setEmailsList] = useRecoilState(emailsListAtom);
  const [selectedEmail, setselectedEmail] = useRecoilState(selectedEmailAtom);
  const [filteredEmails, setFilteredEmails] =
    useRecoilState(filteredEmailsAtom);
  const setSelectedFilter = useSetRecoilState(selectedFilterAtom);

  useEffect(() => {
    if (currentPageNumber) {
      // Resetting some states before fetching new data.
      setselectedEmail(null);
      setEmailsList([]);
      setFilteredEmails([]);
      setSelectedFilter(null);

      fetch(`https://flipkart-email-mock.now.sh/?page=${currentPageNumber}`)
        .then((resp) => resp.json())
        .then((data) => {
          setEmailsList(data.list);
          setFilteredEmails(data.list);
        })
        .catch((error) => console.log(error));
    }
    // Disabled this linting check to avoid unwanted invocation of this useEffect.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPageNumber]);

  return (
    <div className="w-full mx-auto flex flex-col">
      <div className="h-[10vh] px-16 pt-6 pb-5 flex">
        <div className="flex grow">
          <Filters />
        </div>
        <div>
          <Pagination totalPages={2} />
        </div>
      </div>
      <div className="flex">
        {emailsList.length > 0 ? (
          filteredEmails.length > 0 ? (
            <>
              <div
                className={`h-[90vh] py-2 px-16 flex flex-col grow overflow-auto custom-scrollbar ${
                  selectedEmail && "pl-16 !pr-6"
                }`}
              >
                {filteredEmails.map((email) => (
                  <EmailListCard key={email.id} email={email} />
                ))}
              </div>
              {selectedEmail && (
                <div className="w-[70%] pr-14">
                  <EmailBody />
                </div>
              )}
            </>
          ) : (
            <div className="flex my-14 mx-auto text-lg text-text-color font-semibold">
              No emails avaialable for the selected filter. Please remove the
              filter or choose another filter!
            </div>
          )
        ) : (
          <Loader className="!w-1/6" />
        )}
      </div>
    </div>
  );
};

export default EmailApp;
