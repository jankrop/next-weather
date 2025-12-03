"use client";

import { useSearchParams } from "next/navigation";
import Card from "@/components/Card";
import WeatherIcon from "@/components/WeatherIcon";
import TemperatureConverter from "@/components/TemperatureConverter";
import { Navigation2 } from "react-feather";
import ForecastEntry from "@/components/ForecastEntry";
import CardSkeleton from "@/components/CardSkeleton";
import NotFound from "@/app/[locale]/not-found";
import { useTranslations } from "next-intl";
import Alert from "@/components/Alert";
import useGeocodingQuery from "@/queries/useGeocodingQuery";
import useWeatherQuery from "@/queries/useWeatherQuery";
import useForecastQuery from "@/queries/useForecastQuery";
import { useLocale } from "use-intl";
import SpeedConverter from "@/components/SpeedConverter";
import PressureConverter from "@/components/PressureConverter";

export default function Page() {
    const searchParams = useSearchParams();
    const placeName = searchParams.get("place");
    const locale = useLocale();

    const {
        data: places,
        isLoading: isPlacesLoading,
        isError: isPlacesError,
    } = useGeocodingQuery(placeName, locale);

    const place = !!places ? places[0] : null;

    const {
        data: currentWeather,
        isLoading: isWeatherLoading,
        isError: isWeatherError,
    } = useWeatherQuery(place, locale);
    const {
        data: forecast,
        isLoading: isForecastLoading,
        isError: isForecastError,
    } = useForecastQuery(place, locale);

    const t = useTranslations();

    const windDirection = [
        "N",
        "NNE",
        "NE",
        "ENE",
        "E",
        "ESE",
        "SE",
        "SSE",
        "S",
        "SSW",
        "SW",
        "WSW",
        "W",
        "WNW",
        "NW",
        "NNW",
    ][Math.round((currentWeather?.wind.deg || 0) / 22.5) % 16];

    if (places?.length === 0) {
        // This means that the searched place doesn't exist, so 404 error
        return <NotFound />;
    }

    return (
        <div className="w-full flex flex-col items-center p-4 pt-0">
            {isPlacesError || isWeatherError || isForecastError ? (
                <Alert>An error occurred while requesting data.</Alert>
            ) : null}
            {isPlacesLoading || isPlacesError || places?.length === 0 ? (
                <CardSkeleton className={"w-full max-w-200 h-10 my-4"} />
            ) : (
                <h1 className="text-4xl my-6">{place!.name}</h1>
            )}
            <div className="flex flex-col md:flex-row items-center md:items-start justify-center w-full gap-4 md:gap-12 max-h-full">
                <div className="w-full md:w-96 flex flex-col items-stretch gap-4 max-w-96 md:sticky md:top-17">
                    {isWeatherLoading || isWeatherError ? (
                        <>
                            <CardSkeleton className="h-46" />
                            <div className="flex gap-4">
                                <CardSkeleton className="h-46 flex-1" />
                                <CardSkeleton className="h-46 flex-1" />
                            </div>
                        </>
                    ) : (
                        <>
                            <Card className="p-6 flex flex-col gap-3">
                                <div className="flex items-center gap-3">
                                    <WeatherIcon
                                        iconId={currentWeather!.weather[0].icon}
                                        size={96}
                                        strokeWidth={1}
                                    />
                                    <div>
                                        <div className="text-6xl">
                                            <TemperatureConverter
                                                kelvin={
                                                    currentWeather!.main.temp
                                                }
                                            />
                                        </div>
                                        <div className="text-lg">
                                            {t("weather.feels-like")}
                                            <TemperatureConverter
                                                kelvin={
                                                    currentWeather!.main
                                                        .feels_like
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="text-xl">
                                    {currentWeather!.weather[0].description[0].toUpperCase() +
                                        currentWeather!.weather[0].description.slice(
                                            1,
                                        )}
                                </div>
                            </Card>
                            <div className="flex gap-4">
                                <Card className="flex-1 p-6 flex flex-col justify-center h-46">
                                    <div className="text-gray-400">
                                        {t("weather.pressure")}
                                    </div>
                                    <div className="text-2xl mb-3">
                                        <PressureConverter
                                            hPa={currentWeather!.main.pressure}
                                        />
                                    </div>
                                    <div className="text-gray-400">
                                        {t("weather.humidity")}
                                    </div>
                                    <div className="text-2xl">
                                        {currentWeather!.main.humidity}%
                                    </div>
                                </Card>
                                <Card className="flex-1 px-6 flex flex-col justify-between items-stretch h-46">
                                    <div className="text-gray-400 pb-1">
                                        {t("weather.wind")}
                                    </div>
                                    <div className="flex-1 flex justify-center items-center">
                                        <div
                                            className="rounded-full border-2 border-gray-600 w-24 h-24 flex justify-center items-center"
                                            style={{
                                                transform: `rotate(${currentWeather!.wind.deg + 180}deg)`,
                                            }}
                                        >
                                            <Navigation2
                                                size={80}
                                                strokeWidth={1}
                                                className="-mt-0.5"
                                            />
                                        </div>
                                    </div>
                                    <div className="text-xl flex justify-between">
                                        <div>
                                            <SpeedConverter
                                                mps={currentWeather!.wind.speed}
                                            />
                                        </div>
                                        <div>{windDirection}</div>
                                    </div>
                                </Card>
                            </div>
                        </>
                    )}
                </div>

                <div className="w-full md:w-72 lg:w-96 flex flex-col items-stretch gap-4 max-w-96">
                    <h3 className="text-2xl">{t("weather.forecast")}</h3>
                    {isForecastLoading || isForecastError
                        ? Array.from(Array(20).keys()).map((i) => (
                              <CardSkeleton key={i} className="h-13.5" />
                          ))
                        : forecast!.list.map((weather, i) => (
                              <ForecastEntry
                                  key={i}
                                  weather={weather}
                                  isSelected={false}
                                  onClick={() => {}}
                              />
                          ))}
                </div>
            </div>
        </div>
    );
}
