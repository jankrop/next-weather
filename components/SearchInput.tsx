"use client"

import {Search} from "react-feather";
import {ComponentPropsWithoutRef, useId, useState} from "react";

export default function SearchInput({
    suggestions, onChange, onBlur, ...props
} : Omit<ComponentPropsWithoutRef<'input'>, 'defaultValue'> & {
    suggestions?: string[]
}) {
    const inputId = useId();

    const [isFocused, setIsFocused] = useState(false)
    const [search, setSearch] = useState("");

    const matchingSuggestions = search === "" ? [] : suggestions
        ?.filter(s => s.toLowerCase().startsWith(search.toLowerCase()))
        .slice(0, 3)

    return (
        <div className="h-10.5">
            <div className="relative flex flex-col bg-gray-800 rounded-[21px] animation">
                <div className={
                    "absolute z-0 rounded-[21px] bg-primary w-full h-full blur-md transition-opacity duration-200 " +
                    (isFocused ? "opacity-50" : "opacity-0")
                }/>
                <div className={
                    "absolute z-1 rounded-[21px] bg-primary w-full h-full transition-opacity duration-200 " +
                    (isFocused ? "opacity-100" : "opacity-0")
                }/>
                <div className="
                    m-[1px] z-2 bg-gray-900 rounded-[20px]
                ">
                    <div className="flex h-10">
                        <div className={
                            "flex justify-center items-center h-10 w-10 transition-colors duration-200 " +
                            (isFocused && "text-teal-400")
                        }>
                            <Search size="24" />
                        </div>
                        <input
                            className="m-[1px] ml-0 z-2 bg-gray-900 flex-1 pr-4 py-2 rounded-r-[20px] outline-none"
                            size={40} id={inputId} value={search}
                            onChange={e => {
                                setSearch(e.target.value)
                                if (onChange) onChange(e)  // onChange and onBlur are used by useForm
                            }}
                            onBlur={e => {
                                setIsFocused(false)
                                if (onBlur) onBlur(e)
                            }}
                            onFocus={() => setIsFocused(true)}
                            {...props}
                        />
                        <label htmlFor={inputId} className="hidden">{props.placeholder || 'Search'}</label>  {/* For accessibility */}
                    </div>
                    <div
                        className="transition-all duration-200 overflow-hidden"
                        style={{ height: matchingSuggestions?.length && isFocused ?
                                32 * (matchingSuggestions?.length || 0) + 8 + 'px' : 0
                        }}
                    >
                        {matchingSuggestions?.map((suggestion, index) => (
                            <div
                                key={index} onClick={() => setSearch(suggestion)}
                                className="px-2 py-1 cursor-pointer hover:bg-primary hover:bg-clip-text hover:text-transparent"
                            >
                                {suggestion}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}