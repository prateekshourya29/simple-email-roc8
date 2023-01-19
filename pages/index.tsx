// Next.js
import Head from "next/head";
// React
import { useEffect } from "react";
// Recoil
import { useSetRecoilState } from "recoil";
import { favoriteEmailsAtom, readEmailsAtom } from "../components/recoil";
// Components
import EmailApp from "@/components/EmailApp";

export default function Home() {
  // Recoil States
  const setFavoriteEmails = useSetRecoilState(favoriteEmailsAtom);
  const setReadEmails = useSetRecoilState(readEmailsAtom);

  // To Clear Local Storage
  // useEffect(() => {
  //   localStorage.clear();
  // }, []);

  // Retriving data from local storage.
  useEffect(() => {
    const favoriteEmails = localStorage.getItem("favoriteEmails");
    if (favoriteEmails) {
      setFavoriteEmails(JSON.parse(favoriteEmails));
    }

    const readEmails = localStorage.getItem("readEmails");
    if (readEmails) {
      setReadEmails(JSON.parse(readEmails));
    }
    // Disabled this linting check to avoid unwanted invocation of this useEffect.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head>
        <title>Email App</title>
        <meta name="description" content="An Email app for roc8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="h-screen bg-background-color overflow-hidden">
        <EmailApp />
      </main>
    </>
  );
}
