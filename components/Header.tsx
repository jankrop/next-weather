"use client";

import Toggle from "@/components/Toggle";
import { useContext, useState } from "react";
import settingsContext from "@/contexts/SettingsContext";
import { Link } from "@/i18n/navigation";
import { Settings, X } from "react-feather";
import { useLocale } from "use-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation";

export default function Header() {
    const { settings, setSettings } = useContext(settingsContext);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const temperature = settings.temperature;

    const setTemperature = (temp: "celsius" | "fahrenheit" | "kelvin") => {
        setSettings({ ...settings, temperature: temp });
    };

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const locale = useLocale();

    const changeLocale = (newLocale: string) => {
        if (newLocale === locale) return;

        const segments = pathname.split("/");
        segments[1] = newLocale;
        const newPath = segments.join("/");

        const queryString = searchParams.toString();
        const url = queryString ? `${newPath}?${queryString}` : newPath;

        router.push(url);
    };

    return (
        <>
            <header className="bg-gray-900/50 text-gray-200 w-full border-b border-b-gray-800 backdrop-blur-sm shadow-md shadow-gray-950/50 sticky top-0">
                <div className="w-full max-w-[1000px] mx-auto flex items-center px-3">
                    <div className="text-xl p-3">
                        <Link href="/">Next weather</Link>
                    </div>
                    <button
                        className={"ml-auto sm:hidden cursor-pointer p-3"}
                        onClick={() => setIsSettingsOpen(true)}
                    >
                        <Settings />
                    </button>
                    <div className="ml-auto hidden sm:flex gap-1">
                        <Toggle
                            isSelected={temperature === "celsius"}
                            onSelect={() => setTemperature("celsius")}
                        >
                            °C
                        </Toggle>
                        <Toggle
                            isSelected={temperature === "fahrenheit"}
                            onSelect={() => setTemperature("fahrenheit")}
                        >
                            °F
                        </Toggle>
                        <Toggle
                            isSelected={temperature === "kelvin"}
                            onSelect={() => setTemperature("kelvin")}
                        >
                            K
                        </Toggle>
                        <div className="w-8" />
                        <Toggle
                            isSelected={locale === "en"}
                            onSelect={() => changeLocale("en")}
                        >
                            EN
                        </Toggle>
                        <Toggle
                            isSelected={locale === "pl"}
                            onSelect={() => changeLocale("pl")}
                        >
                            PL
                        </Toggle>
                    </div>
                </div>
            </header>
            <div
                className={
                    (isSettingsOpen ? "flex opacity-100" : "hidden opacity-0") +
                    " fixed top-0 left-0 w-full h-full z-50 transition-opacity duration-200 items-center"
                }
            >
                <div
                    className={
                        "fixed top-0 left-0 w-full h-full bg-black/50 cursor-pointer"
                    }
                    onClick={() => setIsSettingsOpen(false)}
                />
                <div className={"z-50 w-full m-4 bg-gray-900 rounded-lg"}>
                    <div className={"flex justify-end"}>
                        <button
                            className={"p-2 cursor-pointer"}
                            onClick={() => setIsSettingsOpen(false)}
                        >
                            <X />
                        </button>
                    </div>
                    <div className={"p-2 flex flex-col gap-3"}>
                        <div className={"text-center"}>Temperature units</div>
                        <div className={"flex justify-center gap-4"}>
                            <Toggle
                                large
                                isSelected={temperature === "celsius"}
                                onSelect={() => setTemperature("celsius")}
                            >
                                °C
                            </Toggle>
                            <Toggle
                                large
                                isSelected={temperature === "fahrenheit"}
                                onSelect={() => setTemperature("fahrenheit")}
                            >
                                °F
                            </Toggle>
                            <Toggle
                                large
                                isSelected={temperature === "kelvin"}
                                onSelect={() => setTemperature("kelvin")}
                            >
                                K
                            </Toggle>
                        </div>
                        <div className={"text-center"}>Language</div>
                        <div className={"flex justify-center gap-4"}>
                            <Toggle
                                large
                                isSelected={locale === "en"}
                                onSelect={() => changeLocale("en")}
                            >
                                EN
                            </Toggle>
                            <Toggle
                                large
                                isSelected={locale === "pl"}
                                onSelect={() => changeLocale("pl")}
                            >
                                PL
                            </Toggle>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
