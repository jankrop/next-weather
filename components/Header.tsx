"use client"

import Toggle from "@/components/Toggle";
import {useState} from "react";

export default function Header() {
    const [temperature, setTemperature] = useState('celsius');

    return (
        <header className="bg-gray-900/50 text-gray-200 w-full border-b border-b-gray-800 backdrop-blur-md shadow-md shadow-gray-950/50 fixed">
            <div className="w-full max-w-[1000px] mx-auto flex items-center">
                <div className="text-xl p-3">
                    Next weather
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