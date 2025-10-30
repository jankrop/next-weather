import {useContext} from "react";
import SettingsContext from "@/contexts/SettingsContext";

export default function TemperatureConverter({ kelvin } : { kelvin: number }) {
    const { settings } = useContext(SettingsContext);

    const temperature = (() => {switch (settings.temperature) {
        case "celsius": return kelvin - 273.15;
        case "fahrenheit": return kelvin * 9/5 - 459.67;
        default: return kelvin;
    }})();

    return <>{Math.round(temperature)}°</>
}