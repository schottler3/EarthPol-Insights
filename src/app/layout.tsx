import "./globals.css";
import Header from "./components/Header";
import Script from "next/script";
import { ClientProviders } from "./providers";

export const metadata = {
  title: "EPMC Insights",
  description: "Compiled information for EarthPol.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" }
    ]
  } 
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='anonymous' />
        <link href="https://fonts.googleapis.com/css2?family=Varela+Round&display=swap" rel="stylesheet" />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
        </Script>
        <Script src="https://cdn.jsdelivr.net/npm/chart.js" strategy="beforeInteractive" />
      </head>
      <body className="antialiased flex flex-col h-screen">
        <ClientProviders>
          <Header />
          
          <div className="flex overflow-hidden h-full">
            <main className="bg-navy h-full w-full overflow-y-auto no-scrollbar">
              {children}
            </main>
          </div>
        </ClientProviders>
      </body>  
    </html>
  );
}