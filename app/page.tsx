"use client"

import SearchInput from "@/components/SearchInput";
import Button from "@/components/Button";
import {SubmitHandler, useForm} from "react-hook-form";

export default function Page() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<{place: string}>();

    const onSearch: SubmitHandler<{ place: string }> = data => {

    }

    return (
        <div className="h-96 bg-gradient-to-r from-teal-950 via-blue-950 to-purple-950 flex justify-center items-center relative">
            <h1 className="text-4xl">Accurate weather forecasts worldwide</h1>
            <form
                className="absolute bottom-0 translate-y-1/2 mx-auto flex gap-3"

            >
                <SearchInput placeholder="Search for places around the world..." />
                <Button type="submit">Get weather</Button>
            </form>
        </div>
    );
}