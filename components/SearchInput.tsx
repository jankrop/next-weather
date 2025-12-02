"use client";

import { Search } from "react-feather";
import { ComponentPropsWithoutRef, useEffect, useId, useState } from "react";

export default function SearchInput({
    suggestions,
    loading,
    isValid = true,
    onSuggestionSelect,
    onChange,
    onBlur,
    ...props
}: Omit<ComponentPropsWithoutRef<"input">, "defaultValue"> & {
    suggestions?: string[];
    loading?: boolean;
    isValid: boolean;
    onSuggestionSelect: (suggestion: string) => void;
}) {
    const inputId = useId();

    const [isFocused, setIsFocused] = useState(false);
    const [search, setSearch] = useState("");
    const [displaySuggestions, setDisplaySuggestions] = useState<string[]>([]);

    useEffect(() => {
        if (!loading && suggestions !== undefined)
            setDisplaySuggestions(suggestions);
    }, [loading, suggestions]);

    return (
        <div className="h-10.5 w-full md:max-w-105">
            <div className="relative flex flex-col bg-gray-800 rounded-[21px] animation">
                <div
                    className={
                        "absolute z-0 rounded-[21px] w-full h-full blur-md transition-opacity duration-200 " +
                        (isFocused || !isValid ? "opacity-50" : "opacity-0") +
                        " " +
                        (isValid ? "bg-primary" : "bg-rose-500")
                    }
                />
                <div
                    className={
                        "absolute z-1 rounded-[21px] w-full h-full transition-opacity duration-200 " +
                        (isFocused || !isValid ? "opacity-100" : "opacity-0") +
                        " " +
                        (isValid ? "bg-primary" : "bg-rose-500")
                    }
                />
                <div
                    className="
                    m-[1px] z-2 bg-gray-900 rounded-[20px]
                "
                >
                    <div className="flex h-10">
                        <div
                            className={
                                "flex justify-center items-center h-10 w-10 transition-colors duration-200 " +
                                (isFocused && "text-teal-400")
                            }
                        >
                            <Search size="24" />
                        </div>
                        <input
                            className="m-[1px] ml-0 z-2 bg-gray-900 flex-1 pr-4 py-2 rounded-r-[20px] sm:rounded-l-none outline-none"
                            id={inputId}
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                if (onChange) onChange(e);
                            }}
                            onBlur={(e) => {
                                setIsFocused(false);
                                if (onBlur) onBlur(e);
                            }}
                            onFocus={() => setIsFocused(true)}
                            {...props}
                        />
                        <label htmlFor={inputId} className="hidden">
                            {props.placeholder || "Search"}
                        </label>{" "}
                        {/* For accessibility */}
                    </div>
                    <div
                        className="transition-all duration-200 overflow-hidden"
                        style={{
                            height:
                                displaySuggestions.length && isFocused
                                    ? 32 * (displaySuggestions.length || 0) +
                                      8 +
                                      "px"
                                    : 0,
                        }}
                    >
                        {displaySuggestions.map((suggestion, index) => (
                            <div
                                key={index}
                                onClick={() => {
                                    setSearch(suggestion);
                                    onSuggestionSelect(suggestion);
                                }}
                                className="px-2 py-1 cursor-pointer hover:bg-primary hover:bg-clip-text hover:text-transparent overflow-hidden text-nowrap text-ellipsis"
                            >
                                {suggestion}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
