import {ReactNode} from "react";

export default function Toggle({
    children, isSelected, onSelect,
}: {
    children: ReactNode, isSelected: boolean, onSelect: () => void,
}) {
    return (
        <button className={
            'cursor-pointer transition-colors duration-200 w-7 h-7 rounded flex items-center justify-center ' + (
                isSelected ?
                    'bg-white/10' :
                    'hover:bg-white/10'
            )
        } onClick={onSelect}>{children}</button>
    )
}