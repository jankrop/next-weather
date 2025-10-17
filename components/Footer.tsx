export default function Footer() {
    return (
        <footer className="
            bg-gray-900 text-gray-200 w-full p-3
            border-t border-t-gray-800 shadow-md shadow-gray-950/50 text-center
            ">
            Made with &#x2764; and &#x2615; by&nbsp;
            <a
                href="https://github.com/jankrop"
                className="
                    bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 bg-clip-text text-transparent group
                    relative inline-block
                "
            >
                Jan Kropiwnicki
                <div className="
                    absolute bottom-[2px] w-0 h-[1px] bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500
                    group-hover:w-full transition-all duration-200
                "></div>
            </a>
        </footer>
    )
}