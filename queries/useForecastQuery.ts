import {useQuery} from "@tanstack/react-query";
import {fetchForecast} from "@/api";
import Place from "@/types/Place";

export default function useForecastQuery(place: Place | null, lang: string = "pl") {
    return useQuery({
        queryKey: ['forecast', place?.lat, place?.lon],
        staleTime: 6_000_000,
        queryFn: () => fetchForecast(place?.lat, place?.lon, lang),
        enabled: !!place,
        refetchOnWindowFocus: false,
    })
}