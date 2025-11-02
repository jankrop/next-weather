"use client"

import PlaceSearchForm from "@/components/PlaceSearchForm";

export default function Page() {
    return (
        <div className="w-full h-96 bg-gradient-to-r from-teal-950 via-blue-950 to-purple-950 flex justify-center items-center relative">
            <h1 className="text-4xl">Accurate weather forecasts worldwide</h1>
            <PlaceSearchForm className="absolute bottom-0 translate-y-1/2 mx-auto" />
        </div>
    );
}