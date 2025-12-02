import Link from "@/components/Link";
import { useTranslations } from "next-intl";

export default function Footer() {
    const t = useTranslations("common");

    return (
        <footer
            className="
            bg-gray-900 text-gray-200 w-full p-3
            border-t border-t-gray-800 shadow-md shadow-gray-950/50 text-center
            flex flex-col md:flex-row justify-center items-center gap-3 md:gap-12 lg:gap-24
        "
        >
            <span>
                {t("footer.author")}
                <Link external href="https://github.com/jankrop">
                    {t("footer.author-name")}
                </Link>
            </span>
            <span>
                {t("footer.weather-data")}
                <Link external href="https://openweathermap.org/">
                    {t("footer.openweathermap")}
                </Link>
            </span>
        </footer>
    );
}
