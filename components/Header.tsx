"use client"

import Toggle from "@/components/Toggle";
import {useContext} from "react";
import settingsContext from "@/contexts/SettingsContext";
import Link from "next/link";

export default function Header() {
    const { settings, setSettings } = useContext(settingsContext);

    const temperature = settings.temperature;

    const setTemperature = (temp: 'celsius' | 'fahrenheit' | 'kelvin') => {
        setSettings({...settings, temperature: temp});
    }

    return (
        <header className="bg-gray-900/50 text-gray-200 w-full border-b border-b-gray-800 backdrop-blur-md shadow-md shadow-gray-950/50 sticky">
            <div className="w-full max-w-[1000px] mx-auto flex items-center">
                <div className="text-xl p-3">
                    <Link href="/">Next weather</Link>
                </div>
                <div className="ml-auto flex gap-1">
                    <Toggle isSelected={temperature === 'celsius'} onSelect={() => setTemperature('celsius')}>°C</Toggle>
                    <Toggle isSelected={temperature === 'fahrenheit'} onSelect={() => setTemperature('fahrenheit')}>°F</Toggle>
                    <Toggle isSelected={temperature === 'kelvin'} onSelect={() => setTemperature('kelvin')}>K</Toggle>
                </div>
            </div>
        </header>
    )
}