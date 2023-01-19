// React
import React, { useEffect, useState } from "react";
// Recoil
import { useRecoilState, useRecoilValue } from "recoil";
import { favoriteEmailsAtom, selectedEmailAtom } from "./recoil";
// Moment
import moment from "moment";
// Components
import Loader from "./Loader";
// Types
import { IEmailBodyData } from "@/types";
// DOMPurify
// Adding this to sanitize data becuase we are using dangerouslySetInnerHTML
import DOMPurify from "dompurify";

const EmailBody: React.FC = () => {
  // Recoil States
  const selectedEmail = useRecoilValue(selectedEmailAtom);
  const [favoriteEmails, setFavoriteEmails] =
    useRecoilState(favoriteEmailsAtom);

  // Internal States
  const [emailBody, setEmailBody] = useState<IEmailBodyData | null>(null);

  useEffect(() => {
    if (selectedEmail?.id) {
      setEmailBody(null);
      fetch(`https://flipkart-email-mock.vercel.app/?id=${selectedEmail.id}`)
        .then((resp) => resp.json())
        .then((data) => setEmailBody(data))
        .catch((error) => console.log(error));
    }
  }, [selectedEmail]);

  const handleFavoriteEmail = (id: string) => {
    let newFavoriteEmails = [...favoriteEmails];

    if (newFavoriteEmails.includes(id)) {
      newFavoriteEmails = newFavoriteEmails.filter((emailId) => emailId !== id);
    } else {
      newFavoriteEmails.push(id);
    }

    setFavoriteEmails(newFavoriteEmails);
    localStorage.removeItem("favoriteEmails");
    localStorage.setItem("favoriteEmails", JSON.stringify(newFavoriteEmails));
  };

  const isEmailFavorite = (id: string) => {
    return favoriteEmails.includes(id);
  };

  return (
    <div className="h-[86vh] my-2 mx-4 px-2 py-6 flex bg-white border-2 border-border-color rounded-lg shadow-xs cursor-default overflow-auto custom-scrollbar">
      {selectedEmail && emailBody ? (
        <>
          <div className="px-4 flex grow-0">
            <div className="w-11 h-11 flex items-center justify-center text-xl text-white font-semibold bg-accent-color rounded-full">
              {selectedEmail.from.name.charAt(0).toUpperCase()}
            </div>
          </div>
          <div className="pr-12 flex flex-col grow text-text-color">
            <div className="pb-1 flex">
              <div className="grow text-2xl font-semibold">
                {selectedEmail.subject}
              </div>
              <div className="grow-0">
                <button
                  onClick={() => handleFavoriteEmail(emailBody.id)}
                  className="px-4 py-2 text-xs font-semibold text-white bg-accent-color rounded-full"
                >
                  {isEmailFavorite(emailBody.id)
                    ? "Remove from favorite"
                    : "Mark as favorite"}
                </button>
              </div>
            </div>
            <div className="py-4 text-sm">
              {moment(selectedEmail.date).format("DD/MM/YYYY HH:MMa")}
            </div>
            <div
              className="pt-4 pb-8 pr-2 [&_p]:pb-4"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(emailBody.body),
              }}
            />
          </div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default EmailBody;
