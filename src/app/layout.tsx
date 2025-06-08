import "./globals.css";
import LeftMenu from "./components/LeftMenu";
import Header from "./components/Header";

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
      <body className="antialiased">
          <Header />
          
          <div className="flex w-screen h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)] lg:h-[calc(100vh-6rem)]">
            <div className="w-min">
            <LeftMenu /></div>
            <main className="overflow-y-auto overflow-x-hidden no-scrollbar w-full bg-navy">
              {children}
            </main>
        </div>
      </body>  
    </html>
  );
}