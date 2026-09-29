import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import ScrollProgress from "@/components/ScrollProgress";
import Spotlight from "@/components/Spotlight";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Phyo Thiha Win | Software Engineer",
  description: "Portfolio of Phyo Thiha Win, a Software Engineer proficient in web and mobile development.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${robotoMono.variable} h-full antialiased scroll-smooth dark`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var root = document.documentElement;
                root.classList.add('js');
                // Dark is the default. Only an explicit saved "light" choice overrides it
                // (the OS colour-scheme preference is intentionally ignored).
                var theme = 'dark';
                try {
                  if (localStorage.getItem('theme') === 'light') theme = 'light';
                } catch (e) {}
                root.classList.toggle('dark', theme === 'dark');
                root.setAttribute('data-theme', theme);
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col selection:bg-zinc-800 dark:selection:bg-zinc-800 selection:text-white dark:selection:text-white font-sans relative">
        <ThemeProvider>
          {/* Global Ambient Background */}
          <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-zinc-50 dark:bg-black transition-colors duration-300">
            <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-zinc-200/50 dark:bg-zinc-800/20 blur-[120px] md:animate-blob"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-zinc-300/40 dark:bg-zinc-900/40 blur-[150px] md:animate-blob" style={{ animationDelay: '2s' }}></div>
          </div>
          {children}
          <ScrollProgress />
          <Spotlight />
        </ThemeProvider>
      </body>
    </html>
  );
}
