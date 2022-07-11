import supabase from "../../lib/getSupabase";
import { BsXCircle, BsArrowRight } from "react-icons/bs";

import { useState } from "react";

export default function Login({ handleModal }: { handleModal: VoidFunction }) {
    const [email, setEmail] = useState<string>("");
    const [sent, setSent] = useState<boolean>(false);

    // Incorporate a library like ZOD to validate email before calling Supabase Auth.

    const auth = async () => {
        await supabase.auth.signIn({ email });
        setSent(true);
    };

    return (
        <div className='fixed inset-0 z-10 overflow-y-auto'>
            <div
                className='fixed inset-0 w-full h-full bg-black opacity-40'
                onClick={() => {
                    handleModal();
                    setSent(false);
                }}
            ></div>
            <div className='flex items-center min-h-screen'>
                <div className='relative w-full sm:max-w-xl sm:mx-auto mt-auto sm:mt-0 bg-white rounded-md shadow-lg'>
                    <div className='p-6 sm:p-12'>
                        <div className='mb-2 text-center'>
                            <h4 className='text-4xl font-bold text-gray-800'>
                                Welcome 👋🏼
                            </h4>
                            <p className='mt-2 text-lg text-gray-500'>
                                {!sent ? (
                                    <span>
                                        Fill out your email and login using a
                                        passwordless link
                                    </span>
                                ) : (
                                    <span>
                                        Check your email <b>{email}</b> and
                                        login using our passwordless link
                                    </span>
                                )}
                            </p>
                        </div>
                        {!sent && (
                            <>
                                <div className='my-2'>
                                    <label className='sr-only' htmlFor='email'>
                                        {" "}
                                        Email{" "}
                                    </label>

                                    <input
                                        className='w-full py-3 px-3 border-2 border-gray-200 rounded'
                                        id='email'
                                        type='email'
                                        placeholder='Email'
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                </div>
                                <div className='flex flex-col sm:flex-row mt-2 gap-2'>
                                    <button
                                        className='group flex gap-2 items-center justify-center w-full text-center px-8 py-2 sm:py-3 text-lg text-gray-800 border rounded border-red-600 hover:border-red-900 focus:outline-none focus:ring'
                                        onClick={handleModal}
                                    >
                                        Go back
                                        <BsXCircle
                                            className='text-red-600 group-hover:text-red-900'
                                            size={20}
                                        />
                                    </button>

                                    <button
                                        className='group flex gap-2 items-center justify-center w-full text-center px-8 py-2 sm:py-3 text-lg text-gray-800 border rounded border-transparent hover:border-red-900 focus:outline-none focus:ring'
                                        onClick={auth}
                                    >
                                        Login
                                        <BsArrowRight
                                            className='text-red-600 group-hover:text-red-900'
                                            size={20}
                                        />
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
