import { ClerkProvider } from "@clerk/nextjs";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Provider from "./provider";
import { Toaster } from "sonner";

const AppFont = DM_Sans({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={AppFont.className}>
        <ClerkProvider
          signInFallbackRedirectUrl="/"
          signUpFallbackRedirectUrl="/"
        >
          <Provider>
            {children}
            <Toaster position="top-center"  richColors />
          </Provider>
        </ClerkProvider>
      </body>
    </html>
  );
}