import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { Sidebar } from "@/components/sidebar";
import { getAuthSession } from "@/utils/auth";
import { redirect } from "next/navigation";
import { NavBar } from "@/components/navbar";
import { ThemeProvider } from "@/providers/themes-providers";

const inter = Inter({ subsets: ["latin"] });

export default async function Layout({
    children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const session = await getAuthSession()
    if(!session) {
      redirect('/login')
    }
    return (
    <html lang="fr" className='dark'>
      <body className={inter.className}>
        <ThemeProvider themes={['red', 'green', 'blue', 'violet', 'light']}
          attribute="class"
          disableTransitionOnChange
        >
          <div className="m-h-dvh">
            <div className="border-t h-full">
              <div className="bg-background h-full">
                <div className="grid lg:grid-cols-5 h-full">
                  <Sidebar session={session} className="hidden lg:flex" />
                  <div className="col-span-3 lg:col-span-4 lg:border-l min-h-full">
                    <NavBar session={session} />
                    <div className="flex-1 space-y-4 p-8 pt-4 lg:pt-6 h-full">
                      {children}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
    )
}