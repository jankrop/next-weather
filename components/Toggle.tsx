import { ReactNode } from "react";

export default function Toggle({
    children,
    isSelected,
    onSelect,
    large,
}: {
    children: ReactNode;
    isSelected: boolean;
    onSelect: () => void;
    large?: boolean;
}) {
    return (
        <button
            className={
                "cursor-pointer transition-colors duration-200  rounded flex items-center justify-center " +
                (isSelected ? "bg-white/10 " : "hover:bg-white/10 ") +
                (large ? "w-12 h-12 text-2xl" : "w-7 h-7")
            }
            onClick={onSelect}
        >
            {children}
        </button>
    );
}
