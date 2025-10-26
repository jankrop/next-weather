"use client"

import SearchInput from "@/components/SearchInput";
import Button from "@/components/Button";
import {SubmitHandler, useForm} from "react-hook-form";
import {useRouter} from "next/navigation";

export default function Page() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<{place: string}>();

    const router = useRouter();

    const onSearch: SubmitHandler<{ place: string }> = data => {
        router.push("/weather");
    }

    return (
        <div className="h-96 bg-gradient-to-r from-teal-950 via-blue-950 to-purple-950 flex justify-center items-center relative">
            <h1 className="text-4xl">Accurate weather forecasts worldwide</h1>
            <form
                className="absolute bottom-0 translate-y-1/2 mx-auto flex gap-3"
                onSubmit={handleSubmit(onSearch)}
            >
                <SearchInput
                    suggestions={[
                        "Warsaw, Poland",
                        "Kraków, Poland",
                        "Łódź, Poland",
                        "Wrocław, Poland",
                        "Poznań, Poland",
                        "Gdańsk, Poland",
                        "Szczecin, Poland",
                        "Bydgoszcz, Poland",
                        "Lublin, Poland",
                        "Katowice, Poland",
                        "Olsztyn, Poland",
                        "Opole, Poland",
                        "Rzeszów, Poland",
                        "Kielce, Poland",
                        "Białystok, Poland",
                        "Gorzów Wielkopolski, Poland"
                    ]}
                    placeholder="Search for places around the world..."
                    {...register("place", { required: true })}
                />
                <Button type="submit">Get weather</Button>
            </form>
        </div>
    );
}