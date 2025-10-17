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
                    'bg-gray-800' :
                    'hover:bg-gray-800'
            )
        } onClick={onSelect}>{children}</button>
    )
}