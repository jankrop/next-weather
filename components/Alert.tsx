import { ReactNode } from "react";

export default function Alert({ children }: { children: ReactNode }) {
    return (
        <div className="fixed bottom-0 left-0 w-full flex justify-center p-2 md:p-4">
            <div className="bg-rose-950 border border-rose-500 text-rose-500 p-3 rounded-lg">
                {children}
            </div>
        </div>
    );
}
