import { Source_Sans_3, Space_Grotesk } from "next/font/google";
import "./globals.css";
import TopNavbar from "./components/top-navbar";
import ThemeProvider from "./components/theme-provider";

const displayFont = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});

const bodyFont = Source_Sans_3({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata = {
  title: "GoDomain Learning Path",
  description: "Student learning progress path for the GoDomain platform.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${displayFont.variable} ${bodyFont.variable} antialiased`}
      >
        <ThemeProvider>
          <div className="root-layout">
            <TopNavbar />
            <div className="root-content">{children}</div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
