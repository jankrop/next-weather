import { createContext } from "react";
import Settings from "@/types/Settings";

const settingsContext = createContext<{
    settings: Settings;
    setSettings: (settings: Settings) => void;
}>({
    settings: {
        measurements: "metric",
        temperature: "celsius",
    },
    setSettings: () => {},
});

export default settingsContext;
