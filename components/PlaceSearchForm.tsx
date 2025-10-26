import SearchInput from "@/components/SearchInput";
import Button from "@/components/Button";
import {SubmitHandler, useForm} from "react-hook-form";
import {useRouter} from "next/navigation";
import {useDebounce} from "use-debounce";
import {useEffect} from "react";
import {useQuery} from "@tanstack/react-query";

type Place = {
    name: string;
    state: string;
    country: string;
}

export default function PlaceSearchForm({ className = "" }) {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<{place: string}>();

    const place = watch("place");
    const [debouncedPlace] = useDebounce(place, 500);

    const geocodingQuery = useQuery({
        queryKey: ["place", debouncedPlace],
        staleTime: Infinity,
        queryFn: async () => {
            const res = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${debouncedPlace}&limit=10&appid=4083d44a25bea4846e95b56d01ac3795`)
            console.log(res)
            return res.json();
        },
        enabled: !!debouncedPlace,
        refetchOnWindowFocus: false,
    })

    // useEffect(() => {
    //     if (debouncedPlace) geocodingQuery.refetch();
    // }, [debouncedPlace]);

    const router = useRouter();

    const onSearch: SubmitHandler<{ place: string }> = data => {
        router.push(`/weather?city=${data.place}`);
    }

    return (
        <form
            className={"flex gap-3 " + className}
            onSubmit={handleSubmit(onSearch)}
        >
            <SearchInput
                suggestions={
                    (geocodingQuery.data as Place[])
                        ?.map((place: Place) => `${place.name}, ${place.state}, ${place.country}`)
                        .filter((v, i, a) => a.indexOf(v) === i)  // Get only unique entries
                        .slice(0, 5)
                }
                placeholder="Search for places around the world..."
                {...register("place", { required: true })}
            />
            <Button type="submit">Get weather</Button>
        </form>
    )
}