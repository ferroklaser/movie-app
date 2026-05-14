'use client'
import { useState } from "react"
import MyButton from "../MyButton"
import { useRouter } from "next/navigation"
import TextInput from "../TextInput"
import { signInWithEmail } from "@/src/app/(auth)/login/action"

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()

    const handleLogin = async () => {
        await signInWithEmail(email, password)
        resetFields()
    }

    const resetFields = () => {
        setEmail('')
        setPassword('')
    }

    return (
        <div className="flex w-full min-h-screen justify-center items-center">
            <div className="w-[20vw] h-[40vh] bg-white rounded-2xl flex flex-col justify-center">
                <div className="w-full flex justify-center items-center p-10">
                    <span className="font-semibold text-2xl">Login</span>
                </div>
                <div className="flex flex-col justify-center gap-10 text-xl">
                    <div className="w-full flex justify-center items-center flex-col px-10">
                        <div className="flex w-full">
                            <span>Email:</span>
                        </div>
                        <TextInput 
                            name="email"
                            placeholder="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="h=[3vh] w-full"
                        />
                    </div>
                    <div className="w-full flex justify-center items-center flex-col px-10">
                        <div className="flex w-full">
                            <span>Password:</span>
                        </div>
                        <TextInput
                            name="password"
                            placeholder="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="h-[3vh] w-full"
                        />
                    </div>
                </div>
                <div className="flex">
                    <MyButton label="Login" className="w-full" onClick={handleLogin}/>
                </div>
                <div className="flex justify-center">
                    <span>Don't have an account? <button onClick={() => router.push('/signup')}>Sign Up</button></span>
                </div>
            </div>
        </div>
    )
}

export default Login