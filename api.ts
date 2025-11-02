import CurrentWeather from "@/types/CurrentWeather";
import Place from "@/types/Place";
import Forecast from "@/types/Forecast";

const API_KEY = "4083d44a25bea4846e95b56d01ac3795"

export async function fetchGeocodingData(placeName: string | null) : Promise<Place[]> {
    const res = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${placeName}&limit=10&appid=${API_KEY}`)
    return res.json();
}

export async function fetchCurrentWeather(lat?: number, lon?: number) : Promise<CurrentWeather> {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
    return res.json();
}

export async function fetchForecast(lat?: number, lon?: number) : Promise<Forecast> {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
    return res.json();
}