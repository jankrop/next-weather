import CurrentWeather from "@/types/CurrentWeather";
import Place from "@/types/Place";
import Forecast from "@/types/Forecast";

const OWM_API_KEY = "4083d44a25bea4846e95b56d01ac3795";
const MAPTILER_API_KEY = "3cvHJyiS10vry0lSxTqY";

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
        `https://api.maptiler.com/geocoding/${placeName}.json?key=${MAPTILER_API_KEY}&language=${lang}&types=joint_municipality,joint_submunicipality,municipality,municipal_district,locality,place`,
    );
    const data: MaptilerResponse = await res.json();
    return mapMaptilerResponseToPlaces(data);
}

export async function fetchCurrentWeather(
    lat?: number,
    lon?: number,
    lang: string = "en",
): Promise<CurrentWeather> {
    const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=${lang}&appid=${OWM_API_KEY}`,
    );
    return res.json();
}

export async function fetchForecast(
    lat?: number,
    lon?: number,
    lang: string = "en",
): Promise<Forecast> {
    const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&lang=${lang}&appid=${OWM_API_KEY}`,
    );
    return res.json();
}
