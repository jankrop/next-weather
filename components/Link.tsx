import { ComponentPropsWithoutRef } from "react";
import { Link } from "@/i18n/navigation";

function CustomLink({
    external,
    children,
    ...props
}: ComponentPropsWithoutRef<typeof Link> & { external?: boolean }) {
    const linkContent = (
        <>
            {children}
            <div
                className="
                absolute bottom-[2px] w-0 h-[1px] bg-primary
                group-hover:w-full transition-all duration-200
            "
            />
        </>
    );

    const linkProps = {
        className:
            "bg-primary bg-clip-text text-transparent group relative inline-block",
        ...props,
    };

    return external ? (
        <a {...(linkProps as ComponentPropsWithoutRef<"a">)}>{linkContent}</a>
    ) : (
        <Link {...linkProps}>{linkContent}</Link>
    );
}

export default CustomLink;
