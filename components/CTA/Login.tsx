import supabase from "../../lib/getSupabase";
import { BsXCircle, BsArrowRight } from "react-icons/bs";

import { z } from "zod";
import { MdAlternateEmail } from "react-icons/md";
import { CgSpinner } from "react-icons/cg";
import { AiOutlineCheckCircle } from "react-icons/ai";

import { useState } from "react";

export default function Login({ handleModal }: { handleModal: VoidFunction }) {
    const [email, setEmail] = useState<string>("");
    const [sent, setSent] = useState<boolean>(false);

    const auth = async () => {
        await supabase.auth.signIn(
            { email },
            { redirectTo: "http://localhost:3000/?loginredirect=true" }
            // { redirectTo: "http://simple-feedback.vercel.app/?loginredirect=true" }
        );
        setSent(true);
    };

    const isEmailValid = (email: string): boolean => {
        return z.string().email().safeParse(email).success;
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
                                        login using our passwordless link. <br/> Might want to check the Spam folder 👀 just in case!
                                    </span>
                                )}
                            </p>
                        </div>
                        {!sent && (
                            <>
                                <div className='relative my-2'>
                                    <label className='sr-only' htmlFor='email'>
                                        Email
                                    </label>

                                    <input
                                        className='w-full py-3 pl-3 pr-12 border-2 border-gray-200 rounded'
                                        id='email'
                                        type='email'
                                        placeholder='Email'
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                    <span className='absolute -translate-y-1/2 pointer-events-none top-1/2 right-4'>
                                        {!email.length && (
                                            <MdAlternateEmail
                                                size={24}
                                                className='text-gray-300'
                                            />
                                        )}
                                        {email.length > 0 &&
                                            !isEmailValid(email) && (
                                                <CgSpinner
                                                    size={24}
                                                    className='text-orange-400 animate-spin'
                                                />
                                            )}
                                        {isEmailValid(email) && (
                                            <AiOutlineCheckCircle
                                                size={24}
                                                className='text-green-500 opacity-80'
                                            />
                                        )}
                                    </span>
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
                                        className={`group flex gap-2 items-center justify-center w-full text-center px-8 py-2 sm:py-3 text-lg text-gray-800 border rounded border-transparent
                                            ${
                                                isEmailValid(email)
                                                    ? "hover:border-red-900 focus:outline-none focus:ring"
                                                    : "disabled:text-gray-400 disabled:cursor-not-allowed disabled:bg-gray-100"
                                            }`}
                                        onClick={auth}
                                        disabled={!isEmailValid(email)}
                                    >
                                        Login
                                        <BsArrowRight
                                            className={
                                                isEmailValid(email)
                                                    ? "text-red-600 group-hover:text-red-900"
                                                    : "text-gray-400"
                                            }
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
