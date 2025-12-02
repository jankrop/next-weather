import Place from "@/types/Place";
import { useQuery } from "@tanstack/react-query";
import { fetchCurrentWeather } from "@/api";

export default function useWeatherQuery(
    place: Place | null,
    lang: string = "pl",
) {
    return useQuery({
        queryKey: ["weather", place?.lat, place?.lon],
        staleTime: 6_000_000,
        queryFn: () => fetchCurrentWeather(place?.lat, place?.lon, lang),
        enabled: !!place,
        refetchOnWindowFocus: false,
    });
}
