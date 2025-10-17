import { ReactNode } from "react";

export default function Button({
    children
}: {
    children: ReactNode
}) {
    return (
        <button className="
            rounded-lg relative group bg-gray-800 cursor-pointer active:scale-95 transition-transform duration-200
        ">
            <div className="
                absolute -z-1 rounded-lg bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 w-full h-full
                blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-200
            "/>
            <div className="
                absolute z-0 rounded-lg bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 w-full h-full
                opacity-0 group-hover:opacity-100 transition-opacity duration-200
            " />
            <div className="relative rounded-lg z-1 bg-gray-950 px-3 py-1.5 text-lg text-white font-bold m-[1px]">
                {children}
            </div>
        </button>
    )
}