import {Sun, Moon, Cloud, CloudRain, CloudLightning, CloudSnow, AlignCenter, X} from "react-feather";
import {ComponentPropsWithoutRef} from "react";

export default function WeatherIcon({
    iconId, ...props
} : ComponentPropsWithoutRef<typeof Sun> & { iconId: string }) {
    switch(iconId) {
        case "01d":
            return <Sun {...props} />
        case "01n":
            return <Moon {...props} />
        case "02d":
        case "02n":
        case "03d":
        case "03n":
        case "04d":
        case "04n":
            return <Cloud {...props} />
        case "09d":
        case "09n":
        case "10d":
        case "10n":
            return <CloudRain {...props} />
        case "11d":
        case "11n":
            return <CloudLightning {...props} />
        case "13d":
        case "13n":
            return <CloudSnow {...props} />
        case "50d":
        case "50n":
            return <AlignCenter {...props} />  // There was no mist icon, so I used the most similar one
        default:
            return <X {...props} />
    }
}