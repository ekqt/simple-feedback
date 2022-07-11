import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";

Hero.defaultProps = {
    heading: {
        highlighted: "Feedback",
        regular: "made easy",
    },
    tagline: "Life is already too complicated, feedback should be simple",
    button1: {
        label: "Get Started",
        href: "/",
    },
    button2: {
        label: "Sign Up",
        href: "/",
    },
};

export default function Hero({
    heading,
    tagline,
    button1,
    button2,
}: {
    heading: { highlighted: string; regular: string };
    tagline: string;
    button1: { label: string; href: string };
    button2: { label: string; href: string };
}): JSX.Element {
    return (
        <div className='flex flex-col md:items-center gap-2 max-w-3xl mx-auto my-16 px-4'>
            <h1 className='text-6xl md:text-8xl font-bold md:text-center mb-4 md:mb-6'>
                <span className='text-transparent leading-8 md:leading-[3rem] bg-gradient-to-r bg-clip-text from-red-500 to-orange-400'>
                    {heading.highlighted}
                </span>
                <span className='block text-gray-700 leading-8 md:leading-[3rem]'>
                    {heading.regular}
                </span>
            </h1>
            <p className='text-gray-600 text-lg md:text-center'>{tagline}</p>
            <div className='flex flex-col sm:flex-row mt-2 gap-2'>
                <Link href={button1.href} passHref>
                    <a className='group flex gap-2 items-center justify-center min-w-[10rem] text-center px-8 py-2 sm:py-3 text-lg text-gray-800 border rounded border-red-600 hover:border-red-900 focus:outline-none focus:ring'>
                        {button1.label}
                        <BsArrowRight className='text-red-600 group-hover:text-red-900' size={20} />
                    </a>
                </Link>
                <Link href={button2.href} passHref>
                    <a className='group flex gap-2 items-center justify-center min-w-[10rem] text-center px-8 py-2 sm:py-3 text-lg text-gray-800 border rounded border-transparent hover:border-red-900 focus:outline-none focus:ring'>
                        {button2.label}
                        <BsArrowRight className='text-red-600 group-hover:text-red-900' size={20} />
                    </a>
                </Link>
            </div>
        </div>
    );
}
