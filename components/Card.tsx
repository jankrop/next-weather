import {ReactNode} from "react";

export default function Card({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <div className="bg-gray-900 p-3 border border-gray-800 rounded-xl shadow-lg shadow-gray-950">
            {children}
        </div>
    )
}