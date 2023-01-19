// Recoil
import { atom } from "recoil";
// Types
import { IEmailData, SelectedFilterTypes } from "@/types";

export const emailsListAtom = atom<IEmailData[]>({
  key: "emailsList",
  default: [],
});

export const currentPageNumberAtom = atom<number>({
  key: "currentPageNumber",
  default: 1,
});

export const selectedEmailAtom = atom<IEmailData | null>({
  key: "selectedEmail",
  default: null,
});

export const favoriteEmailsAtom = atom<string[]>({
  key: "favoriteEmails",
  default: [],
});

export const readEmailsAtom = atom<string[]>({
  key: "readEmails",
  default: [],
});

export const filteredEmailsAtom = atom<IEmailData[]>({
  key: "filteredEmails",
  default: [],
});

export const selectedFilterAtom = atom<SelectedFilterTypes | null>({
  key: "selectedFilter",
  default: null,
});
