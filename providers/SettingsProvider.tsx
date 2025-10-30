"use client"

import {ReactNode, useState} from "react";
import Settings from "@/types/Settings";
import SettingsContext from "@/contexts/SettingsContext";

export default function SettingsProvider({
    children,
} : {
    children?: ReactNode;
}) {
    const [settings, setSettings] = useState<Settings>({
        measurements: 'metric',
        temperature: 'celsius',
    });

    return (
        <SettingsContext value={{ settings, setSettings }}>
            {children}
        </SettingsContext>
    )
}