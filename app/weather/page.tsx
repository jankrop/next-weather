"use client"

import {useQuery} from "@tanstack/react-query";
import {useSearchParams} from "next/navigation";
import Card from "@/components/Card";
import WeatherIcon from "@/components/WeatherIcon";
import TemperatureConverter from "@/components/TemperatureConverter";

export default function Page() {
    const searchParams = useSearchParams();
    const placeName = searchParams.get("place");

    const { data: places } = useQuery({
        queryKey: ['place', placeName],
        staleTime: Infinity,
        queryFn: async () => {
            const res = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${placeName}&limit=10&appid=4083d44a25bea4846e95b56d01ac3795`);
            console.log(res);
            return res.json();
        },
        enabled: !!placeName,
        refetchOnWindowFocus: false,
    })

    const place = !!places ? places[0] : null

    const { data: currentWeather } = useQuery({
        queryKey: ['weather', place?.lat, place?.lon],
        staleTime: 6_000_000,
        queryFn: async () => {
            const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${place?.lat}&lon=${place?.lon}&appid=4083d44a25bea4846e95b56d01ac3795`);
            console.log(res)
            return res.json();
        },
        enabled: !!place,
        refetchOnWindowFocus: false,
    })

    const { data: forecast } = useQuery({
        queryKey: ['forecast', place?.lat, place?.lon],
        staleTime: 6_000_000,
        queryFn: async () => {
            const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${place?.lat}&lon=${place?.lon}&appid=4083d44a25bea4846e95b56d01ac3795`)
            return res.json()
        },
        enabled: !!place,
        refetchOnWindowFocus: false,
    })

    return (
        <div className={"w-full max-w-[800px] mx-auto"}>
            { !!place &&
                <h1 className="text-4xl my-6">{place.name}{!!place.state && ", " + place.state}, {place.country}</h1>
            }
            <Card className="w-96 p-6">
                {currentWeather && <>
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
                </>}
            </Card>
        </div>
    )
}