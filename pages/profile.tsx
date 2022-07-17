import type { NextPage } from "next";
import Meta from "../components/Meta";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../components/Providers/UserProvider";
import supabase from "../lib/getSupabase";
import { BsArrowRight } from "react-icons/bs";

const Profile: NextPage = () => {
    const [user, setUser] = useContext(UserContext);
    const [preferredName, setPreferredName] = useState<string>("");
    const [userEmail, setUserEmail] = useState<string>("");

    const handleUpdate = async () => {
        const { user, error } = await supabase.auth.update({
            data: { preferred_name: preferredName },
        });
        !error && setUser(user);
    };

    useEffect(() => {
        user && setPreferredName(user.user_metadata.preferred_name);
        user && setUserEmail(user.email);
    }, [user]);

    return (
        <>
            <Meta />
            <section className='max-w-2xl mx-auto px-4 mt-4 mb-24'>
                <div className='flex flex-col p-2'>
                    <h1 className='text-4xl md:text-6xl font-bold text-gray-800'>
                        Welcome
                        {user?.user_metadata?.preferred_name
                            ? ` back ${user.user_metadata.preferred_name}!`
                            : "!"}
                    </h1>
                    <p className='text-xl text-gray-700'>
                        {user?.user_metadata?.preferred_name
                            ? "Keep your information up to date! ✨"
                            : "Let's update your information! 🎉"}
                    </p>
                </div>
                <div className='flex flex-col py-6 px-8 my-8 max-w-2xl mx-auto rounded-lg shadow-2xl'>
                    <h2 className='text-2xl md:text-3xl font-bold text-gray-800 mt-2'>
                        About you
                    </h2>
                    <div className='my-4'>
                        <label
                            htmlFor='preferred_name'
                            className='text-lg md:text-xl'
                        >
                            Preferred Name
                        </label>

                        <input
                            type='text'
                            id='preferred_name'
                            className='w-full mt-2 p-4 text-lg border border-gray-200 rounded-lg shadow-sm'
                            placeholder='Please write your preferred name'
                            value={preferredName}
                            onChange={(e) => setPreferredName(e.target.value)}
                        />
                    </div>
                    <div className='mb-6'>
                        <label
                            htmlFor='preferred_name'
                            className='text-lg md:text-xl'
                        >
                            Email
                        </label>

                        <input
                            type='email'
                            id='email'
                            className='w-full mt-2 p-4 text-lg border border-gray-200 rounded-lg shadow-sm cursor-not-allowed'
                            value={userEmail}
                            disabled
                        />
                    </div>

                    <button
                        onClick={handleUpdate}
                        className='group flex gap-2 items-center justify-center w-full md:w-fit md:min-w-[10rem] text-center px-8 py-2 sm:py-3 text-lg text-gray-800 border rounded border-red-600 hover:border-red-900 focus:outline-none focus:ring'
                    >
                        Update
                        <BsArrowRight
                            className='text-red-600 group-hover:text-red-900'
                            size={20}
                        />
                    </button>
                </div>
            </section>
        </>
    );
};

export default Profile;
