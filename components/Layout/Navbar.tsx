import Link from "next/link";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";

import { BiMenu } from "react-icons/bi";
import { SiMaildotru, SiGithub } from "react-icons/si";
import { AiOutlineUser } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";

import { useState, useEffect, useContext } from "react";
import supabase from "../../lib/getSupabase";
import { UserContext } from "../Providers/UserProvider";
import Login from "../CTA/Login";
import Welcome from "../CTA/Welcome";

export default function Navbar() {
    const [menu, setMenu] = useState<boolean>(false);
    const [profileMenu, setProfileMenu] = useState<boolean>(false);
    const [user, setUser] = useContext(UserContext);
    const [loginModal, setLoginModal] = useState<boolean>(false);
    const [welcomeModal, setWelcomeModal] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        router.query.loginredirect && setWelcomeModal(true);
    }, [router]);

    const signOut = async () => {
        await supabase.auth.signOut();
        setUser(null);
    };

    useEffect(() => {
        const getUser = () => {
            const supabaseUser = supabase.auth.user();
            setUser(supabaseUser);
        };
        window.addEventListener("hashchange", function () {
            getUser();
        });
        getUser();
    }, [user, setUser]);

    const handleLoginModal = () => {
        setLoginModal(!loginModal);
    };

    const handleWelcomeModal = () => {
        setWelcomeModal!(!welcomeModal);
        router.replace({ query: {} });
    };

    const items = [
        {
            label: "Home",
            href: "/",
        },
        {
            label: "Getting Started",
            href: "#getting-started",
        },
    ];
    const social = [
        {
            label: "Email",
            href: "mailto:hello@hectorsosa.me",
        },
        {
            label: "GitHub",
            href: "https://github.com/ekqt",
        },
    ];

    const account = [
        {
            label: "Profile",
            href: "/profile",
        },
        {
            label: "Feedback Rooms",
            href: "/feedback",
        },
    ];

    return (
        <>
            <nav
                className='flex items-center relative max-w-screen-xl px-2 py-8 mx-auto'
                aria-labelledby='primary-navigation'
            >
                <button
                    className='md:hidden border border-transparent rounded p-1 text-gray-700 text-lg font-normal hover:text-gray-500 hover:border-gray-300'
                    onClick={() => setMenu(!menu)}
                >
                    <BiMenu size={24} />
                </button>
                <nav
                    className={`flex flex-col gap-1 absolute top-20 left-0 z-10 p-4 w-full origin-top-left bg-white rounded-lg shadow-lg ${
                        menu ? "" : "hidden"
                    }`}
                    aria-labelledby='primary-dropdown-navigation'
                >
                    <div className='-my-2 divide-y divide-gray-100'>
                        <div className='py-2'>
                            <strong className='block p-2 text-sm font-medium text-gray-400 uppercase'>
                                Navigation
                            </strong>
                            {items.map((i) => (
                                <Link key={uuidv4()} href={i.href} passHref>
                                    <a
                                        aria-label={i.label}
                                        className='block px-4 py-2 text-lg text-gray-600 rounded-lg hover:bg-gray-100 hover:text-gray-700'
                                        onClick={() => setMenu(false)}
                                    >
                                        {i.label}
                                    </a>
                                </Link>
                            ))}
                        </div>
                        <div className='py-2'>
                            <strong className='block p-2 text-sm font-medium text-gray-400 uppercase'>
                                Social
                            </strong>
                            {social.map((i) => (
                                <Link key={uuidv4()} href={i.href} passHref>
                                    <a
                                        target='_blank'
                                        aria-label={i.label}
                                        className='flex gap-3 px-4 py-2 text-lg  text-gray-600 rounded-lg hover:bg-gray-100 hover:text-gray-700'
                                        onClick={() => setMenu(false)}
                                    >
                                        {i.label === "Email" && (
                                            <SiMaildotru size={26} />
                                        )}
                                        {i.label === "GitHub" && (
                                            <SiGithub size={26} />
                                        )}
                                        {i.label}
                                    </a>
                                </Link>
                            ))}
                        </div>
                    </div>
                </nav>
                <h1 className='p-2 text-xl cursor-default font-bold text-transparent bg-gradient-to-r bg-clip-text from-red-500 to-orange-400'>
                    Simple Feedback
                </h1>

                <nav
                    className='hidden md:flex gap-6 mx-8'
                    aria-labelledby='menu-navigation'
                >
                    {items.map((i) => (
                        <Link key={uuidv4()} href={i.href} passHref>
                            <a
                                aria-label={i.label}
                                className='text-gray-500 text-lg hover:text-gray-600'
                            >
                                {i.label}
                            </a>
                        </Link>
                    ))}
                </nav>

                <nav
                    className='ml-auto flex items-center gap-4 px-2'
                    aria-labelledby='secondary-navigation'
                >
                    {social.map((i) => (
                        <Link key={uuidv4()} href={i.href} passHref>
                            <a
                                target='_blank'
                                aria-label={i.label}
                                className='hidden md:block text-gray-700 text-lg border-2 border-transparent hover:text-gray-500'
                            >
                                {i.label === "Email" && (
                                    <SiMaildotru size={26} />
                                )}
                                {i.label === "GitHub" && <SiGithub size={26} />}
                            </a>
                        </Link>
                    ))}
                    {!user ? (
                        <button
                            className='text-center px-5 py-2 text-lg text-gray-800 border rounded border-red-600 hover:border-red-900 focus:outline-none focus:ring'
                            onClick={() => {
                                setLoginModal(true);
                            }}
                        >
                            Login
                        </button>
                    ) : (
                        <div className='relative'>
                            <button
                                className='border border-gray-700 rounded-full p-1 text-gray-700 text-lg font-normal hover:text-gray-500 hover:border-gray-500'
                                onClick={() => setProfileMenu(!profileMenu)}
                                tabIndex={0}
                                onBlur={() =>
                                    setTimeout(() => setProfileMenu(false), 100)
                                }
                            >
                                <AiOutlineUser size={18} />
                            </button>
                            <div
                                className={`absolute right-0 z-10 w-56 mt-3 origin-top-right bg-white border border-gray-100 rounded-md shadow-lg ${
                                    profileMenu ? "" : "hidden"
                                }`}
                            >
                                <div className='flow-root py-2'>
                                    <div className='-my-2 divide-y divide-gray-100'>
                                        <div className='p-2'>
                                            <strong className='block pt-2 px-2 text-sm font-medium text-gray-400 uppercase'>
                                                Account
                                            </strong>
                                            <span className='block px-2 mb-2 text-xs font-normal text-gray-400'>
                                                {user.email}
                                            </span>

                                            {account.map((i) => (
                                                <Link
                                                    key={uuidv4()}
                                                    href={i.href}
                                                    passHref
                                                >
                                                    <a
                                                        aria-label={i.label}
                                                        className='block px-4 py-2 text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700'
                                                        onClick={() =>
                                                            setProfileMenu(
                                                                false
                                                            )
                                                        }
                                                    >
                                                        {i.label}
                                                    </a>
                                                </Link>
                                            ))}
                                        </div>

                                        <div className='p-2'>
                                            <strong className='block p-2 text-sm font-medium text-gray-400 uppercase'>
                                                Session
                                            </strong>
                                            <Link href="/" passHref>
                                                <a
                                                    className='flex items-center w-full gap-2 px-4 py-2 text-red-700 rounded-lg hover:bg-red-50'
                                                    onClick={() => {
                                                        signOut();
                                                        setProfileMenu(false);
                                                    }}
                                                >
                                                    <BiLogOut size={22} />
                                                    Logout
                                                </a>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </nav>
            </nav>
            {loginModal && <Login handleModal={handleLoginModal} />}
            {welcomeModal && <Welcome handleModal={handleWelcomeModal} />}
        </>
    );
}
