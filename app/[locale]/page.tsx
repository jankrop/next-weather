"use client";

import PlaceSearchForm from "@/components/PlaceSearchForm";
import { useTranslations } from "next-intl";

export default function Page() {
    const t = useTranslations();

    return (
        <div className="w-full h-72 sm:h-96 bg-gradient-to-r from-teal-950 via-blue-950 to-purple-950 flex justify-center items-center relative">
            <h1 className="text-2xl sm:text-4xl text-center mx-4">
                {t("home-page.header")}
            </h1>
            <PlaceSearchForm className="absolute bottom-0 translate-y-1/2 mx-auto" />
        </div>
    );
}
