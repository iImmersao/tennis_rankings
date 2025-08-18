import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

import "@/app/_styles/globals.css";
import Header from "./_components/Header";
import { PlayerProvider } from "./_components/PlayerContext";

export const metadata = {
  //title: "The Wild Oasis",
  title: {
    template: "%s / Tennis Rankings",
    default: "Welcome / Tennis Rankings",
  },
  description: "Tennis Rankings information",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${josefin.className} antialiased bg-primary-950 text-primary-100 min-h-screen flex flex-col relative`}
      >
        <Header />
        <div className="flex-1 px-8 py-2 grid">
          <main className="max-w-7xl mx-auto w-full">
            <PlayerProvider>{children}</PlayerProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
