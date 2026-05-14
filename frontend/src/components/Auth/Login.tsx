'use client'
import { useState } from "react"

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div className="flex w-full min-h-screen justify-center items-center">
            <div className="w-[20vw] h-[40vh] bg-white rounded-2xl flex flex-col justify-center">
                <div className="w-full flex justify-center flex-1/6 items-center">
                    <span className="font-semibold text-2xl">Login</span>
                </div>
                <div className="flex flex-col flex-1/2 justify-center gap-10">
                    <div className="w-full flex justify-center items-center flex-col px-10">
                        <div className="flex w-full">
                            <span>Email:</span>
                        </div>
                        <input type="email" value={email} placeholder="Email" className="h-[3vh] text-md w-full" onChange={(e) => setEmail(e.target.value)}></input>
                    </div>
                    <div className="w-full flex justify-center items-center flex-col px-10">
                        <div className="flex w-full">
                            <span>Password:</span>
                        </div>
                        <input type="password" value={password} placeholder="Password" className="h-[3vh] text-md w-full" onChange={(e) => setPassword(e.target.value)}></input>
                    </div>
                </div>
                <div>
                    login button
                </div>
                <span>Don't have an account? <button>Sign Up</button></span>
            </div>
        </div>
    )
}

export default Login