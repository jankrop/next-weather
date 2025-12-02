import Link from "@/components/Link";

export default function Footer() {
    return (
        <footer className="
            bg-gray-900 text-gray-200 w-full p-3
            border-t border-t-gray-800 shadow-md shadow-gray-950/50 text-center
            flex flex-col md:flex-row justify-center items-center gap-3 md:gap-12 lg:gap-24
        ">
            <span>
                Made with &#x2764; and &#x2615; by <Link external href="https://github.com/jankrop">Jan Kropiwnicki</Link>
            </span>
            <span>
                Weather data from <Link external href="https://openweathermap.org/">OpenWeatherMap</Link>
            </span>
        </footer>
    )
}