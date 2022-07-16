import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "../../components/Providers/UserProvider";

import { BsArrowRight } from "react-icons/bs";

export default function Welcome({
    handleModal,
}: {
    handleModal: VoidFunction;
}) {
    const [user, setUser] = useContext(UserContext);

    return user ? (
        <div className='fixed inset-0 z-10 overflow-y-auto'>
            <div
                className='fixed inset-0 w-full h-full bg-black opacity-40'
                onClick={() => {
                    handleModal();
                }}
            ></div>
            <div className='flex items-center min-h-screen'>
                <div className='relative w-full sm:max-w-xl sm:mx-auto mt-auto sm:mt-0 bg-white rounded-md shadow-lg'>
                    <div className='p-6 sm:p-12'>
                        <div className='mb-2 text-center'>
                            <h4 className='text-4xl font-bold text-gray-800'>
                                Welcome{" "}
                                {user?.user_metadata?.preferred_name
                                    ? ` back ${user.user_metadata.preferred_name}!`
                                    : "!"}{" "}
                                👋🏼
                            </h4>
                            <p className='mt-2 text-lg text-gray-500'>
                                You successfully signed in using{" "}
                                <b>{user?.email}</b>!
                            </p>
                            {!user?.user_metadata?.preferred_name && (
                                <p className='mt-2 text-lg text-gray-500'>
                                    Don&apos;t forget to update your profile
                                    information!
                                </p>
                            )}
                        </div>
                        <div className='flex flex-col sm:flex-row mt-4 gap-2'>
                            <button
                                className='group flex gap-2 items-center justify-center w-full text-center px-8 py-2 sm:py-3 text-lg text-gray-800 border rounded border-red-600 hover:border-red-900 focus:outline-none focus:ring'
                                onClick={handleModal}
                            >
                                Continue
                                <BsArrowRight
                                    className='text-red-600 group-hover:text-red-900'
                                    size={20}
                                />
                            </button>
                            <Link href='/profile' passHref>
                                <a
                                    className='group flex gap-2 items-center justify-center w-full text-center px-8 py-2 sm:py-3 text-lg text-gray-800 border rounded border-transparent hover:border-red-900 focus:outline-none focus:ring'
                                    onClick={handleModal}
                                >
                                    Update Profile
                                    <BsArrowRight
                                        className='text-red-600 group-hover:text-red-900'
                                        size={20}
                                    />
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <></>
    );
}
