"use client"

import {useQuery} from "@tanstack/react-query";
import {useSearchParams} from "next/navigation";
import Card from "@/components/Card";
import WeatherIcon from "@/components/WeatherIcon";
import TemperatureConverter from "@/components/TemperatureConverter";
import {fetchCurrentWeather, fetchForecast, fetchGeocodingData} from "@/api";
import {ArrowUp, Navigation2} from "react-feather";

export default function Page() {
    const searchParams = useSearchParams();
    const placeName = searchParams.get("place");

    const { data: places } = useQuery({
        queryKey: ['place', placeName],
        staleTime: Infinity,
        queryFn: () => fetchGeocodingData(placeName),
        enabled: !!placeName,
        refetchOnWindowFocus: false,
    })

    const place = !!places ? places[0] : null

    const { data: currentWeather } = useQuery({
        queryKey: ['weather', place?.lat, place?.lon],
        staleTime: 6_000_000,
        queryFn: () => fetchCurrentWeather(place?.lat, place?.lon),
        enabled: !!place,
        refetchOnWindowFocus: false,
    })

    const { data: forecast } = useQuery({
        queryKey: ['forecast', place?.lat, place?.lon],
        staleTime: 6_000_000,
        queryFn: () => fetchForecast(place?.lat, place?.lon),
        enabled: !!place,
        refetchOnWindowFocus: false,
    })

    const windDirection = [
        'N', 'NNE', 'NE', 'ENE',
        'E', 'ESE', 'SE', 'SSE',
        'S', 'SSW', 'SW', 'WSW',
        'W', 'WNW', 'NW', 'NNW',
    ][Math.round(currentWeather?.wind.deg || 0) % 16]

    console.log(currentWeather)

    return (
        <div className="w-full max-w-[800px] mx-auto">
            { !!place &&
                <h1 className="text-4xl my-6">{place.name}{!!place.state && ", " + place.state}, {place.country}</h1>
            }
            <div className="flex gap-6">
                {!!currentWeather &&
                <div className="flex-1 flex flex-col gap-6">
                    <Card className="p-6 flex flex-col gap-3">
                        {!!currentWeather && <>
                            <div className="flex items-center gap-3">
                                <WeatherIcon iconId={currentWeather.weather[0].icon} size={96} strokeWidth={1} />
                                <div>
                                    <div className="text-6xl">
                                        <TemperatureConverter kelvin={currentWeather.main.temp} />
                                    </div>
                                    <div className="text-lg">
                                        Feels like: <TemperatureConverter kelvin={currentWeather.main.feels_like} />
                                    </div>
                                </div>
                            </div>
                            <div className="text-xl">{
                                currentWeather.weather[0].description[0].toUpperCase() +
                                currentWeather.weather[0].description.slice(1)
                            }</div>
                        </>}
                    </Card>
                    <div className="flex gap-6">
                        <Card className="flex-1 p-6 flex flex-col justify-center">
                            <div className="text-gray-400">Pressure</div>
                            <div className="text-2xl mb-3">{currentWeather.main.pressure} hPa</div>
                            <div className="text-gray-400">Humidity</div>
                            <div className="text-2xl">{currentWeather.main.humidity}%</div>
                        </Card>
                        <Card className="flex-1 px-6 aspect-square flex flex-col">
                            <div className="text-gray-400 pb-1">Wind</div>
                            <div className="flex-1 flex justify-center items-center">
                                <div
                                    className="rounded-full border-2 border-gray-600 w-24 h-24 flex justify-center items-center"
                                    style={{ transform: `rotate(${currentWeather.wind.deg + 180}deg)` }}
                                >
                                    <Navigation2 size={80} strokeWidth={1} className="-mt-0.5" />
                                </div>
                            </div>
                            <div className="text-xl flex justify-between">
                                <div>{currentWeather.wind.speed} m/s</div>
                                <div>{windDirection}</div>
                            </div>
                        </Card>
                    </div>
                </div>
                }
                <div className="flex-1 flex flex-col gap-6">
                    <Card className="p-3 text-xl flex items-center gap-3">
                        10:00
                        <WeatherIcon iconId={"10d"}/>
                        <TemperatureConverter kelvin={293} />
                    </Card>
                </div>
            </div>
        </div>
    )
}