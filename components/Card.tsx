import {ReactNode} from "react";

export default function Card({
    children, className,
}: {
    children: ReactNode, className?: string
}) {
    return (
        <div className={"bg-gray-800 p-3 border border-gray-800 rounded-xl shadow-md shadow-gray-950 " + className}>
            {children}
        </div>
    )
}