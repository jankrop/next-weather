export default function CardSkeleton({ className } : { className?: string }) {
    return (
        <div className={"bg-gray-800 rounded-xl animate-pulse " + className} />
    )
}