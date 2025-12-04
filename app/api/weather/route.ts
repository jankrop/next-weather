import {NextRequest, NextResponse} from "next/server";

export async function GET(request: NextRequest) {
    const apiKey = process.env.OWM_API_KEY;
    if (!apiKey) {
        return NextResponse.json({ status: 401 })
    }

    const searchParams = request.nextUrl.searchParams;
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&${searchParams}`);

    const data = await res.json();
    return NextResponse.json(data);
}