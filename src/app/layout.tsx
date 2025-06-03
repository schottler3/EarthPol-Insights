import "./globals.css";
import { AppProvider } from "./context/AppContext";

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
    <html lang="en" className="overflow-hidden">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='anonymous' />
        <link href="https://fonts.googleapis.com/css2?family=Varela+Round&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`antialiased`}
      >
        <AppProvider>
          {children}
        </AppProvider>
      </body>  
    </html>
  );
}
