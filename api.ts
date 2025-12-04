import CurrentWeather from "@/types/CurrentWeather";
import Place from "@/types/Place";
import Forecast from "@/types/Forecast";

type MaptilerResponse = {
    features: {
        center: number[];
        place_name: string;
    }[];
};

function mapMaptilerResponseToPlaces(response: MaptilerResponse): Place[] {
    return response.features.map<Place>((feature) => ({
        name: feature.place_name,
        lon: feature.center.at(0) ?? 0,
        lat: feature.center.at(1) ?? 0,
    }));
}

export async function fetchGeocodingData(
    placeName: string | null,
    lang: string = "en",
): Promise<Place[]> {
    const res = await fetch(
        `/api/geocoding?placeName=${placeName}&language=${lang}`,
    );
    if (!res.ok)
        return Promise.reject(
            new Error(`Received response code: ${res.status}`),
        );

    const data: MaptilerResponse = await res.json();
    return mapMaptilerResponseToPlaces(data);
}

export async function fetchCurrentWeather(
    lat?: number,
    lon?: number,
    lang: string = "en",
): Promise<CurrentWeather> {
    const res = await fetch(`/api/weather?lat=${lat}&lon=${lon}&lang=${lang}`);
    if (!res.ok)
        return Promise.reject(
            new Error(`Received response code: ${res.status}`),
        );

    return res.json();
}

export async function fetchForecast(
    lat?: number,
    lon?: number,
    lang: string = "en",
): Promise<Forecast> {
    const res = await fetch(`/api/forecast?lat=${lat}&lon=${lon}&lang=${lang}`);
    if (!res.ok)
        return Promise.reject(
            new Error(`Received response code: ${res.status}`),
        );

    return res.json();
}
