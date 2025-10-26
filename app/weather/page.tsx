export default function Page({
     searchParams: { city }
} : {
    searchParams: { city: string }
}) {
    return <>Weather page for {city}</>
}