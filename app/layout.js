import "./globals.css";
import ThemeProvider from "./components/theme-provider";
import TopNavbar from "./components/top-navbar";

export const metadata = {
  title: "GoDomain Learning Path",
  description: "Student learning progress path for the GoDomain platform.",
};

const themeBootScript = `
(() => {
  const key = "godomain-theme";
  const root = document.documentElement;

  try {
    const stored = window.localStorage.getItem(key);
    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    root.setAttribute("data-theme", stored || (prefersDark ? "dark" : "light"));
  } catch {
    root.setAttribute("data-theme", "light");
  }

  root.setAttribute("data-theme-ready", "false");
})();
`;

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-theme="light"
      data-theme-ready="false"
      suppressHydrationWarning
    >
      <head>
        <script>{themeBootScript}</script>
      </head>
      <body suppressHydrationWarning className="antialiased">
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
