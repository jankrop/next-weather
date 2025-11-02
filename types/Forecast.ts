import CurrentWeather from "@/types/CurrentWeather";

type Forecast = {
    list: (CurrentWeather & { dt: number })[]
}

export default Forecast;