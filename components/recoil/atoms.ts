// Recoil
import { atom } from "recoil";
// Types
import { IEmailData } from "@/types";

export const emailsListAtom = atom<IEmailData[]>({
  key: "emailsList",
  default: [],
});

export const currentPageNumberAtom = atom<number>({
  key: "currentPageNumber",
  default: 1,
});
