import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import {Button, Input, Logo} from "./index"
import {useDispatch} from "react-redux"
import authService from "../appwrite/auth"
import {useForm} from "react-hook-form"

function Login() {
    // Hook to navigate programmatically
    const navigate = useNavigate()

    // Hook to dispatch Redux actions
    const dispatch = useDispatch()

    // Hook to handle form inputs and submission
    const { register, handleSubmit } = useForm()

    // State to store any login errors
    const [error, setError] = useState("")

    // Function to handle form submission(naam handleSubmit ke alawa rakhna hai)
    const login = async (data) => {
        setError("")  // Clear any previous errors
        try {
            // Call auth service to log the user in
            const session = await authService.login(data)

            // If login is successful, get current user data
            if (session) {
                const userData = await authService.getCurrentUser()

                // If user data is received, dispatch login to Redux
                if (userData) dispatch(authLogin(userData));

                // Redirect to home page
                navigate("/")
            }
        } catch (error) {
            // If error occurs during login, show error message
            setError(error.message)
        }
    }

    return (
        // Outer container to center the login form
        <div className='flex items-center justify-center w-full'>
            
            {/* Inner card container for the form */}
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>

                {/* Logo centered at top */}
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>

                {/* Heading text */}
                <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>

                {/* Subtext with link to signup */}
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>

                {/* Show error if exists */}
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                {/* Login form */}
                <form onSubmit={handleSubmit(login)} // handle submit is a method jaha apna method dete hai ki me is tarah se form ko handle karunga
                className='mt-8'>
                    <div className='space-y-5'>

                        {/* Email input with validation */}
                        <Input
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {// ...nhi lekhenge to kisi aur jagah register likha to value overrite hojayegi
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })}
                        />

                        {/* Password input with required validation */}
                        <Input
                            label="Password: "
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: true,
                            })}
                        />

                        {/* Submit button */}
                        <Button
                            type="submit"
                            className="w-full"
                        >
                            Sign in
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
