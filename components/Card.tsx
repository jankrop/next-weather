import { ComponentPropsWithoutRef } from "react";

export default function Card({
    children,
    className,
    ...props
}: ComponentPropsWithoutRef<"div">) {
    return (
        <div
            className={
                "bg-gray-800 p-3 border border-gray-800 rounded-xl shadow-md shadow-gray-950 " +
                className
            }
            {...props}
        >
            {children}
        </div>
    );
}
