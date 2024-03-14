import { Inter } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/providers/themes-providers";
import { getAuthSession } from "@/utils/auth";
import { redirect } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getAuthSession();
  if (session) {
    redirect('/');
  }
  return (
    <html lang="fr">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="h-dvh w-dvw flex">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
