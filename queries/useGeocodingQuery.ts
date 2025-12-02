import { useQuery } from "@tanstack/react-query";
import { fetchGeocodingData } from "@/api";

export default function useGeocodingQuery(
    place: string | null,
    lang: string = "en",
) {
    return useQuery({
        queryKey: ["place", place],
        staleTime: Infinity,
        queryFn: () => fetchGeocodingData(place, lang),
        enabled: !!place,
        refetchOnWindowFocus: false,
    });
}
