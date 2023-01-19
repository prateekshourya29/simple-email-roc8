// React
import React from "react";
// Recoil
import { useRecoilState, useRecoilValue } from "recoil";
import {
  favoriteEmailsAtom,
  readEmailsAtom,
  selectedEmailAtom,
} from "./recoil";
// Types
import { IEmailData } from "@/types";
// Moment
import moment from "moment";

interface IProps {
  email: IEmailData;
}

const EmailListCard: React.FC<IProps> = ({ email }: IProps) => {
  // Recoil States
  const [selectedEmail, setselectedEmail] = useRecoilState(selectedEmailAtom);
  const favoriteEmails = useRecoilValue(favoriteEmailsAtom);
  const [readEmails, setReadEmails] = useRecoilState(readEmailsAtom);

  const handleOnClick = (email: IEmailData) => {
    if (!readEmails.includes(email.id)) {
      setReadEmails([...readEmails, email.id]);
      localStorage.removeItem("readEmails");
      localStorage.setItem(
        "readEmails",
        JSON.stringify([...readEmails, email.id])
      );
    }

    if (email.id === selectedEmail?.id) {
      setselectedEmail(null);
    } else {
      setselectedEmail(email);
    }
  };

  const isEmailRead = (id: string) => {
    return readEmails.includes(id);
  };

  return (
    <div
      key={email.id}
      onClick={() => handleOnClick(email)}
      className={`mb-6 p-2 flex border-2 rounded-lg shadow-xs cursor-pointer ${
        email.id === selectedEmail?.id
          ? "border-accent-color"
          : "border-border-color"
      } ${isEmailRead(email.id) ? "bg-read-background" : "bg-white"}`}
    >
      <div className="px-4 flex grow-0">
        <div className="w-11 h-11 flex items-center justify-center text-xl text-white font-semibold bg-accent-color rounded-full">
          {email.from.name.charAt(0).toUpperCase()}
        </div>
      </div>
      <div className="mr-2 flex flex-col grow overflow-hidden whitespace-nowrap">
        <div className="pb-1 text-sm text-text-color">
          From:{" "}
          <span className="capitalize font-semibold">{email.from.name}</span>
          <span className="font-semibold">{`<${email.from.email}>`}</span>
        </div>
        <div className="pb-1 text-sm text-text-color">
          Subject:{" "}
          <span className="capitalize font-semibold">{email.subject}</span>
        </div>
        <div className="py-1 text-sm text-text-color w-full overflow-hidden text-ellipsis">
          {email.short_description}
        </div>
        <div className="flex">
          <div className="py-1 text-xs text-text-color">
            {moment(email.date).format("DD/MM/YYYY HH:MMa")}
          </div>
          {favoriteEmails.includes(email.id) && (
            <div className="py-1 mx-3 px-3 text-xs text-accent-color font-bold">
              Favorite
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailListCard;
