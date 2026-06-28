import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { CurrencyProvider } from "@/context/CurrencyContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AuroraBackground } from "@/components/ui/AuroraBackground";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "PlanDhan — Financial Calculators for Indian Investors",
  description: "Free financial calculators for SIP, FD, PPF, EMI, Retirement and more. Plan every rupee of your future.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${sora.variable} font-body`}>
        <ThemeProvider>
          <CurrencyProvider>
            <div className="relative min-h-screen transition-colors">
              <AuroraBackground />
              <Header />
              <main className="container mx-auto px-4 py-8 max-w-6xl">
                {children}
              </main>
              <Footer />
            </div>
          </CurrencyProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
