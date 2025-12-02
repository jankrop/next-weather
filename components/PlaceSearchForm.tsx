import SearchInput from "@/components/SearchInput";
import Button from "@/components/Button";
import {SubmitHandler, useForm} from "react-hook-form";
import {useRouter} from "@/i18n/navigation";
import {useDebounce} from "use-debounce";
import {useQueryClient} from "@tanstack/react-query";
import {fetchGeocodingData} from "@/api";
import useGeocodingQuery from "@/queries/useGeocodingQuery";
import Place from "@/types/Place";
import {useTranslations} from "next-intl";
import {useLocale} from "use-intl";

export default function PlaceSearchForm({ className = "" }) {
    const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm<{place: string}>();

    const locale = useLocale();

    const t = useTranslations("home-page")

    const place = watch("place");
    const [debouncedPlace] = useDebounce(place, 500);

    const geocodingQuery = useGeocodingQuery(debouncedPlace, locale)

    const router = useRouter();

    const onSearch: SubmitHandler<{ place: string }> = data => {
        router.push(`/weather?place=${data.place}`);
    }

    const queryClient = useQueryClient();

    return (
        <form
            className={"flex gap-3 w-full max-w-160 px-4 " + className}
            onSubmit={handleSubmit(onSearch)}
        >
            <SearchInput
                suggestions={
                    (geocodingQuery.data as Place[])
                        ?.map((place: Place) => place.name)
                        .filter((v, i, a) => a.indexOf(v) === i)  // Get only unique entries
                        .slice(0, 5)
                }
                loading={geocodingQuery.isLoading}
                placeholder={t("search-bar")}
                {...register("place", {
                    required: "A location is required",
                    validate: {
                        isRealLocation: async value => {
                            const data = await queryClient.fetchQuery({
                                queryKey: ["place", value],
                                queryFn: () => fetchGeocodingData(value, locale)
                            })
                            return data?.length > 0
                        }
                    }
                })}
                isValid={!errors.place}
                onSuggestionSelect={s => setValue('place', s)}
            />
            <Button type="submit" className={"hidden sm:inline whitespace-nowrap"}>{t("get-weather")}</Button>
        </form>
    )
}