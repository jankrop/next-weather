import CurrentWeather from "@/types/CurrentWeather";
import Card from "@/components/Card";
import WeatherIcon from "@/components/WeatherIcon";
import TemperatureConverter from "@/components/TemperatureConverter";
import {useLocale} from "use-intl";

export default function ForecastEntry({
    weather, onClick
} : {
    weather: CurrentWeather & { dt: number }, isSelected: boolean, onClick: () => void
}) {
    const date = new Date(weather.dt * 1000);
    const hour = new Date(weather.dt * 1000).getHours();

    const locale = useLocale();

    return (
        <>
            {hour === 1 && (
                <div className="text-gray-400 text-center">
                    {date.toLocaleDateString(locale, {
                        day: "numeric",
                        month: "short",
                        weekday: "long",
                    })}
                </div>
            )}
            <Card className={"flex gap-3 p-3 text-xl items-center"} onClick={onClick}>
                <div className="w-16">
                    {hour.toString().padStart(2, "0")}:00
                </div>
                <WeatherIcon iconId={weather.weather[0].icon} />
                <TemperatureConverter kelvin={weather.main.temp} />
            </Card>
        </>
    )
}