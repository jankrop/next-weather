type CurrentWeather = {
    weather: {
        description: string,
        icon: string,
    }[],
    main: {
        temp: number,
        feels_like: number,
        temp_min: number,
        temp_max: number,
        pressure: number,
        humidity: number,
    },
    wind: {
        speed: number,
        degree: number,
    },
}

export default CurrentWeather;