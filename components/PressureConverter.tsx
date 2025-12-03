import { useContext } from "react";
import SettingsContext from "@/contexts/SettingsContext";

export default function PressureConverter({ hPa }: { hPa: number }) {
    const { settings } = useContext(SettingsContext);

    const pressure =
        settings.measurements === "imperial"
            ? (hPa * 0.0295).toFixed(2)
            : hPa.toFixed(0);

    const unit = settings.measurements === "imperial" ? "in" : "hPa";

    return (
        <>
            {pressure} {unit}
        </>
    );
}
