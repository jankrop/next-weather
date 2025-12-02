"use client";

import Button from "@/components/Button";

export default function NotFound() {
    const goBack = () => {
        window.history.back();
    };

    return (
        <div className={"mt-20 flex flex-col items-center gap-6"}>
            <h2 className={"text-2xl"}>
                We couldn&#39;t find what you&#39;re looking for.
            </h2>
            <Button onClick={goBack}>Go back</Button>
        </div>
    );
}
