import "./globals.css";
import LeftMenu from "./menu/LeftMenu";
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
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='anonymous' />
        <link href="https://fonts.googleapis.com/css2?family=Varela+Round&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased flex flex-col h-screen">
        <Header />
        
        <div className="flex flex-grow overflow-hidden pt-6">
          <div className="w-min bg-charcoal">
            <LeftMenu />
          </div>
          <main className="bg-navy w-full overflow-y-auto no-scrollbar pb-8">
            {children}
          </main>
        </div>
      </body>  
    </html>
  );
}