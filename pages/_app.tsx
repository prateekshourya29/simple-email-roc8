// Next js
import type { AppProps } from "next/app";
// Recoil
import { RecoilRoot } from "recoil";
// Styles
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  );
}
