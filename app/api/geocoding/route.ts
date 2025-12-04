import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const apiKey = process.env.MAPTILER_API_KEY;
    if (!apiKey) {
        return NextResponse.json("", { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const placeName = searchParams.get("placeName");
    searchParams.delete("placeName");

    const res = await fetch(
        `https://api.maptiler.com/geocoding/${placeName}.json?key=${apiKey}&types=joint_municipality,joint_submunicipality,municipality,municipal_district,locality,place&${searchParams}`,
    );

    if (!res.ok) {
        return NextResponse.json(await res.json(), { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
}
