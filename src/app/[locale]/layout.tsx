import Script from "next/script";
import "./globals.css";
import type { Metadata } from "next";
import { HtmlFontSizeProvider } from "@/context/HtmlFontSizeContext";
import { ThemeProvider } from "next-themes";
import { WindowSizeProvider } from "@/context/WindowSizeContext";
import { Nunito, Martel, Montserrat } from "next/font/google";
import { Footer } from "@/components/footer/footer";
import { NextIntlClientProvider, useMessages } from "next-intl";
import CombinedHeader from "@/components/header/CombinedHeader";
import { GeistSans } from "geist/font/sans";
import { Toaster } from "sonner";
import { getMessages } from "next-intl/server";
import { SortProvider } from "@/context/SortContext";

const APP_NAME = "Meninas STEM";
const APP_DEFAULT_TITLE = "Meninas STEM";
const APP_TITLE_TEMPLATE = "%s";
const APP_DESCRIPTION = "Formando futuras cientistas!";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000"),
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const martel = Martel({
  subsets: ["latin"],
  variable: "--font-lato",
  weight: ["400", "700"],
});

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages(params.locale as any);

  return (
    <html
      className={`${GeistSans.variable} transition-all h-full w-full scrollbar-thin scrollbar-webkit duration-200 ease-in-out`}
      suppressHydrationWarning
      lang={params.locale}
    >
      <Script defer data-domain="biomob.org" src="https://plausible.biomob.app/js/script.js" />
      <body className={`${nunito.variable} ${martel.variable} ${montserrat.variable}`}>
        <NextIntlClientProvider messages={messages} locale={params.locale}>
          <WindowSizeProvider>
            <HtmlFontSizeProvider>
              <SortProvider>
                <ThemeProvider defaultTheme="dark" attribute="class" enableSystem={false}>
                  <div className="header">
                    <CombinedHeader locale={params.locale} />
                  </div>
                  <main className="">{children}</main>
                  <Footer />
                </ThemeProvider>
              </SortProvider>
            </HtmlFontSizeProvider>
          </WindowSizeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
