import SearchInput from "@/components/SearchInput";
import Button from "@/components/Button";
import {SubmitHandler, useForm} from "react-hook-form";
import {useRouter} from "next/navigation";
import {useDebounce} from "use-debounce";
import {useQuery} from "@tanstack/react-query";

type Place = {
    name: string;
    state: string;
    country: string;
}

export default function PlaceSearchForm({ className = "" }) {
    const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm<{place: string}>();

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

    const router = useRouter();

    const onSearch: SubmitHandler<{ place: string }> = data => {
        router.push(`/weather?place=${data.place}`);
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
                loading={geocodingQuery.isLoading}
                placeholder="Search for places around the world..."
                {...register("place", {
                    required: "A location is required",
                    validate: {
                        isRealLocation: () => (geocodingQuery.data as Place[]).length != 0
                    }
                })}
                isValid={!errors.place}
                onSuggestionSelect={s => setValue('place', s)}
            />
            <Button type="submit">Get weather</Button>
        </form>
    )
}