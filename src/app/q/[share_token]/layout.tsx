import { Instrument_Serif } from "next/font/google";
import { Toaster } from "sonner";

const instrumentSerif = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export default function PublicQuoteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={instrumentSerif.variable}>
      {children}
      <Toaster richColors position="top-center" />
    </div>
  );
}
