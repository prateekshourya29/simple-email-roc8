// Next.js
import Head from "next/head";
// Components
import EmailApp from "@/components/EmailApp";

export default function Home() {
  return (
    <>
      <Head>
        <title>Email App</title>
        <meta name="description" content="An Email app for roc8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="min-h-screen p-2 bg-background-color">
        <EmailApp />
      </main>
    </>
  );
}
