import {useContext} from "react";
import SettingsContext from "@/contexts/SettingsContext";

export default function SpeedConverter({ mps } : { mps: number }) {
    const { settings } = useContext(SettingsContext);

    const speed = settings.measurements === "imperial" ? mps * 2.237 : mps * 3.6;

    const unit = settings.measurements === "imperial" ? "mph" : "km/h";

    return <>{speed.toFixed(2)} {unit}</>
}