import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import {ReactNode} from "react";
import SettingsProvider from "@/providers/SettingsProvider";
import {NextIntlClientProvider} from "next-intl";
import {getTranslations} from "next-intl/server";

const inter = Inter({
    subsets: ["latin"],
});

export async function generateMetadata({
    params,
} : {
    params: Promise<{ locale: string }>
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale })

    return {
        title: t("common.title"),
        description: t("home-page.header"),
    }
}

export default async function LocaleLayout({
    children,
    params,
}: Readonly<{
    children: ReactNode;
    params: Promise<{ locale: string }>
}>) {
    const { locale } = await params

    return (
        <html lang="en">
            <body className={inter.className + ' bg-gray-900 text-gray-200 antialiased min-h-screen flex flex-col'}>
                <ReactQueryProvider>
                    <NextIntlClientProvider locale={locale}>
                        <SettingsProvider>
                            <Header />
                            <main className="flex-1 flex justify-center">
                                {children}
                            </main>
                            <Footer />
                        </SettingsProvider>
                    </NextIntlClientProvider>
                </ReactQueryProvider>
            </body>
        </html>
    )
}
