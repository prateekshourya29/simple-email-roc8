// React
import React, { useEffect } from "react";
// Recoil
import { useRecoilState, useRecoilValue } from "recoil";
import { currentPageNumberAtom, emailsListAtom } from "./recoil";
// Moment
import moment from "moment";

const EmailApp: React.FC = () => {
  const currentPageNumber = useRecoilValue(currentPageNumberAtom);
  const [emailsList, setEmailsList] = useRecoilState(emailsListAtom);

  useEffect(() => {
    fetch(`https://flipkart-email-mock.now.sh/?page=${currentPageNumber}`)
      .then((resp) => resp.json())
      .then((data) => setEmailsList(data.list))
      .catch((error) => console.log(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPageNumber]);

  return (
    <div className="w-11/12 mx-auto">
      {emailsList.map((email) => (
        <div
          key={email.id}
          className="m-2 mb-6 p-2 flex bg-white border border-border-color rounded-md shadow-xs cursor-pointer"
        >
          <div className="px-4 flex grow-0">
            <div className="w-11 h-11 flex items-center justify-center text-xl text-white font-semibold bg-accent-color rounded-full">
              {email.from.name.charAt(0).toUpperCase()}
            </div>
          </div>
          <div className="flex flex-col grow">
            <div className="pb-1 text-sm text-text-color">
              From:{" "}
              <span className="capitalize font-semibold">
                {email.from.name}
              </span>
              <span className="font-semibold">{`<${email.from.email}>`}</span>
            </div>
            <div className="pb-1 text-sm text-text-color">
              Subject:{" "}
              <span className="capitalize font-semibold">{email.subject}</span>
            </div>
            <div className="py-1 text-sm text-text-color">
              {email.short_description}
            </div>
            <div className="py-1 text-xs text-text-color">
              {moment(email.date).format("DD/MM/YYYY HH:MMa")}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EmailApp;
