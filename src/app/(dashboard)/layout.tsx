import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { Sidebar } from "@/components/sidebar";
import { redirect } from "next/navigation";
import { NavBar } from "@/components/navbar";
import { ThemeProvider } from "@/providers/themes-providers";
import { auth } from "@/auth/auth";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export default async function Layout({
    children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const session = await auth()
    if (!session) {
      redirect('/login');
    }
    return (
    <html lang="fr" className='dark h-dvh'>
      <body className={cn('h-full', inter.className)}>
        <ThemeProvider themes={['red', 'green', 'blue', 'violet', 'light']}
          attribute="class"
          disableTransitionOnChange
        >
          <div className="h-full">
            <div className="border-t h-full">
              <div className="bg-background h-full">
                <div className="grid lg:grid-cols-5 h-full">
                  <Sidebar className="hidden lg:flex h-full col-span-1 overflow-hidden" />
                  <div className="col-span-3 lg:col-span-4 lg:border-l h-full">
                    <NavBar session={session} />
                    <div className="flex-1 space-y-4">
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