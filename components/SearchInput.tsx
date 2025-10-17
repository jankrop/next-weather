import {Search} from "react-feather";
import {ComponentPropsWithoutRef, useId} from "react";

export default function SearchInput(props: ComponentPropsWithoutRef<'input'>) {
    const inputId = useId();

    return (
        <div className="relative flex flex-row-reverse bg-gray-800 rounded-full">
            <input
                className="peer m-[1px] ml-0 z-2 bg-gray-900 flex-1 pr-4 py-2 rounded-r-full outline-none"
                size={40} id={inputId} {...props}
            />
            {/*
                Input is at the top because Tailwind's peer only works when the peer is higher that elements referencing
                it. The component has flex-row-reverse, so the input will be displayed "after" the search icon.
                Basically anything weird in this component can be attributed to Tailwind and me trying to avoid JS here.
            */}
            <label htmlFor={inputId} className="hidden">{props.placeholder || 'Search'}</label>  {/* For accessibility */}
            <div className="
                absolute z-0 rounded-full bg-primary w-full h-full
                blur-md opacity-0 peer-focus:opacity-50 transition-opacity duration-200
            "/>
            <div className="
                absolute z-1 rounded-full bg-primary w-full h-full
                opacity-0 peer-focus:opacity-100 transition-opacity duration-200
            "/>
            <div className="
                m-[1px] mr-0 z-2 bg-gray-900 rounded-l-full flex justify-center items-center w-10
                peer-focus:text-teal-400 transition-colors duration-200
            ">
                <Search size="24" />
            </div>
        </div>
    )
}