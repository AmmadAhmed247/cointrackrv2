import React, { useState } from 'react';
import { Link } from "react-router-dom"
import { FiEye, FiEyeOff } from "react-icons/fi";
import axios from "axios"
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export default function Login({ onClose }) {
    const [activeTab, setTab] = useState("login");
    const [showpass, setPass] = useState(false);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loginerror, setloginerror] = useState("")
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const loginMutation = useMutation({
        mutationFn: async () => {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND}/api/user/login`, { email, password }, { withCredentials: true })
            return res.data;
        },
        onSuccess: () => {
            toast.success("Logged in SuccessFully")
            queryClient.invalidateQueries(["userinfo"])
            setloginerror("")
            onClose()
            navigate("/")
        },
        onError: (error) => {
            const msg = error.response?.data?.message || "Invalid credentials";
            setloginerror(msg);
        },
    })
    const handleSignup = async () => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND}/api/user/register`, {
                email,
                password,
                username: email.split("@")[0]
            });
            toast.success("Account created succesfully")
            onClose();
        } catch (error) {
            toast.error(error.response?.data?.message || "Signup failed.");
        }
    };

    return (
        <div className="border-2 bg-gray-50 relative border-zinc-100 rounded-2xl p-5 h-fit w-125">
            <button onClick={onClose} className="text-md active:scale-95 cursor-pointer pt-2 top-0 right-2  absolute ">✖️</button>
            <div className="flex flex-row justify-evenly gap-16 border-b-1 border-zinc-200 px-10 py-4 ">
                <button onClick={() => { setTab("login") }} className={`text-2xl whitespace-nowrap font-semibold active:scale-95 text-zinc-800 ${activeTab === "login" ? "border-b-3 pb-2 w-12 items-center justify-center flex   border-b-blue-600  " : " border-b-2 active: border-transparent"} `} >Log In</button>
                <button onClick={() => { setTab("signup") }} className={`text-2xl whitespace-nowrap font-semibold active:scale-95 text-zinc-800 ${activeTab === "signup" ? "border-b-3 pb-2 w-12 items-center justify-center flex   border-b-blue-600  " : " border-b-2 border-transparent"} `} >Sign Up</button>
            </div>

            {activeTab === 'login' && (
                <div className="block mt-10 ">
                    <h6 className='text-zinc-800 mb-2  text-sm mt-2' >Email adress</h6>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} className='text-black text-sm w-full px-4 py-4 border-1 border-zinc-300 rounded-md' placeholder='Enter Email' type="text" />
                    <div className="flex justify-between mt-4">

                        <h6 className='text-zinc-800 mb-2  text-sm mt-2'>Password</h6>
                        <Link className='text-zinc-700 transition-transform active:scale-95  mb-2  text-sm mt-2' >forget password?</Link>
                    </div>
                    <div className="relative">
                        <input value={password} onChange={(e) => setPassword(e.target.value)} className='text-black text-sm w-full px-4 py-4 border-1 border-zinc-300 rounded-md' placeholder='Enter Password' type={showpass ? "text" : "password"} />
                        <button onClick={() => setPass(!showpass)} className='text-zinc-500 absolute top-4 z-30 right-5 ' >
                            {showpass ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                        </button>
                        {loginerror && (
                            <div className="text-red-600 text-md mt-2 text-center">
                                {loginerror}
                            </div>
                        )}
                    </div>

                    <div className="flex p-2 mt-4 items-center justify-center px-2 py-4">
                        <button onClick={() => loginMutation.mutate()} className='bg-blue-600 transition-transform text-white font-semibold active:scale-95 w-full rounded-md px-2 py-3 '>Login</button>
                    </div>
                    <div className="flex items-center gap-4 my-6">
                        <div className="flex-grow h-px bg-zinc-300" />
                        <span className="text-sm text-zinc-900 font-semibold">OR</span>
                        <div className="flex-grow h-px bg-zinc-300" />
                    </div>
                    <div className="space-y-3   mt-6">

                        <div className="border flex transition-transform active:scale-95 items-center justify-center gap-2 rounded-md mt-4 px-4 py-2 border-zinc-300 hover:bg-zinc-50 cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="h-5 w-5">
                                <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32 29.4 35 24 35c-6.1 0-11-4.9-11-11s4.9-11 11-11c2.8 0 5.4 1 7.4 2.9l5.7-5.7C33.4 7.3 28.9 5 24 5 13.5 5 5 13.5 5 24s8.5 19 19 19 19-8.5 19-19c0-1.2-.1-2.1-.4-3.5z" />
                                <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.2 16 18.8 13 24 13c2.8 0 5.4 1 7.4 2.9l5.7-5.7C33.4 7.3 28.9 5 24 5c-7.7 0-14.4 4.3-17.7 10.7z" />
                                <path fill="#4CAF50" d="M24 43c5.2 0 10-2 13.5-5.2l-6.2-5.2C29.5 34.6 26.8 36 24 36c-5.3 0-9.8-3.5-11.4-8.3l-6.6 5.1C9.7 38.3 16.4 43 24 43z" />
                                <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1.3 3.4-4 6.1-7.3 7.3l6.2 5.2C38.7 37.2 43 31.2 43 24c0-1.2-.1-2.1-.4-3.5z" />
                            </svg>
                            <span className="text-zinc-800 text-sm font-medium">Continue with Google</span>
                        </div>


                        <div className="border transition-transform active:scale-95 flex items-center justify-center gap-2 rounded-md mt-4 px-4 py-2 border-zinc-300 hover:bg-zinc-50 cursor-pointer">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" className="h-5 w-5" />

                            <span className="text-zinc-800 text-sm font-medium">Continue with Apple</span>
                        </div>




                        <div className="transition-transform active:scale-95 border flex items-center justify-center gap-2 rounded-md mt-4 px-4 py-2 border-zinc-300 hover:bg-zinc-50 cursor-pointer">
                            <img src="https://seeklogo.com/images/M/metamask-logo-09EDE53DBD-seeklogo.com.png" alt="MetaMask" className="h-5 w-5 rounded-sm" />

                            <span className="text-zinc-800 text-sm font-medium">Continue with Wallet</span>
                        </div>
                    </div>
                </div>


            )}
            {activeTab === 'signup' && (<div className="block mt-10 ">
                <div className="space-y-3   mt-6">

                    <div className="border flex transition-transform active:scale-95 items-center justify-center gap-2 rounded-md mt-4 px-4 py-2 border-zinc-300 hover:bg-zinc-50 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="h-5 w-5">
                            <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32 29.4 35 24 35c-6.1 0-11-4.9-11-11s4.9-11 11-11c2.8 0 5.4 1 7.4 2.9l5.7-5.7C33.4 7.3 28.9 5 24 5 13.5 5 5 13.5 5 24s8.5 19 19 19 19-8.5 19-19c0-1.2-.1-2.1-.4-3.5z" />
                            <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.2 16 18.8 13 24 13c2.8 0 5.4 1 7.4 2.9l5.7-5.7C33.4 7.3 28.9 5 24 5c-7.7 0-14.4 4.3-17.7 10.7z" />
                            <path fill="#4CAF50" d="M24 43c5.2 0 10-2 13.5-5.2l-6.2-5.2C29.5 34.6 26.8 36 24 36c-5.3 0-9.8-3.5-11.4-8.3l-6.6 5.1C9.7 38.3 16.4 43 24 43z" />
                            <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1.3 3.4-4 6.1-7.3 7.3l6.2 5.2C38.7 37.2 43 31.2 43 24c0-1.2-.1-2.1-.4-3.5z" />
                        </svg>
                        <span className="text-zinc-800 text-sm font-medium">Continue with Google</span>
                    </div>


                    <div className="border transition-transform active:scale-95 flex items-center justify-center gap-2 rounded-md mt-4 px-4 py-2 border-zinc-300 hover:bg-zinc-50 cursor-pointer">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" className="h-5 w-5" />

                        <span className="text-zinc-800 text-sm font-medium">Continue with Apple</span>
                    </div>




                    <div className="transition-transform active:scale-95 border flex items-center justify-center gap-2 rounded-md mt-4 px-4 py-2 border-zinc-300 hover:bg-zinc-50 cursor-pointer">
                        <img src="https://seeklogo.com/images/M/metamask-logo-09EDE53DBD-seeklogo.com.png" alt="MetaMask" className="h-5 w-5 rounded-sm" />

                        <span className="text-zinc-800 text-sm font-medium">Continue with Wallet</span>
                    </div>
                </div>
                <div className="flex items-center gap-4 my-6">
                    <div className="flex-grow h-px bg-zinc-300" />
                    <span className="text-sm text-zinc-900 font-semibold">OR</span>
                    <div className="flex-grow h-px bg-zinc-300" />
                </div>

                <h6 className='text-zinc-800 mb-2  text-sm mt-2' >Email adress</h6>
                <input value={email}
                    onChange={(e) => setEmail(e.target.value)} className='text-black text-sm w-full px-4 py-4 border-1 border-zinc-300 rounded-md' placeholder='Enter Email' type="text" />
                <div className="flex justify-between mt-4">
                    <h6 className='text-zinc-800 mb-2  text-sm mt-2'>Password</h6>
                </div>
                <div className="relative">

                    <input value={password}
                        onChange={(e) => setPassword(e.target.value)} className='text-black text-sm w-full px-4 py-4 border-1 border-zinc-300 rounded-md' placeholder='Enter Password' type={showpass ? "text" : "password"} />
                    <button onClick={() => setPass(!showpass)} className='text-zinc-600 top-4 right-4 z-40 absolute'  >{showpass ? <FiEyeOff size={20} /> : <FiEye size={20} />}</button>
                </div>
                <div className="flex p-2 mt-4 items-center justify-center px-2 py-4">
                    <button onClick={handleSignup} className='bg-blue-600 text-white font-semibold transition-transform active:scale-95 w-full rounded-md px-2 py-3 ' >Create an account</button>
                </div>
                <div className="text-xs mt-4  text-black">By proceeding, you agree to CoinTrackr Terms of Use & Privacy Policy.</div>
            </div>)}







        </div>

    );
}