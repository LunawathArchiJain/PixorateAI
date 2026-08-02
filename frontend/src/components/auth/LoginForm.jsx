import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    FiMail,
    FiLock,
    FiEye,
    FiEyeOff
} from "react-icons/fi";
import toast from "react-hot-toast";

import { login as loginUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

export default function LoginForm() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [loading, setLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!formData.email || !formData.password) {

            return toast.error("Please fill all fields.");

        }

        try {

            setLoading(true);

            const response = await loginUser(formData);

            login(
                response.token,
                response.user
            );

            toast.success("Login Successful");

            navigate("/dashboard");

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Login Failed"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="flex items-center justify-center px-8 py-16">

            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-10">

                <h2 className="text-3xl font-bold">

                    Welcome Back 👋

                </h2>

                <p className="text-gray-500 mt-2">

                    Login to continue using Pixora AI.

                </p>

                <form
                    onSubmit={handleSubmit}
                    className="mt-8 space-y-5"
                >

                    {/* Email */}

                    <div className="relative">

                        <FiMail
                            className="absolute left-4 top-4 text-gray-400"
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            className="
                                w-full
                                rounded-xl
                                border
                                pl-12
                                pr-4
                                py-3
                                outline-none
                                focus:border-violet-600
                            "
                        />

                    </div>

                    {/* Password */}

                    <div className="relative">

                        <FiLock
                            className="absolute left-4 top-4 text-gray-400"
                        />

                        <input
                            type={
                                showPassword
                                    ? "text"
                                    : "password"
                            }
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className="
                                w-full
                                rounded-xl
                                border
                                pl-12
                                pr-12
                                py-3
                                outline-none
                                focus:border-violet-600
                            "
                        />

                        <button
                            type="button"
                            onClick={() =>
                                setShowPassword(!showPassword)
                            }
                            className="absolute right-4 top-4"
                        >
                            {
                                showPassword
                                    ? <FiEyeOff />
                                    : <FiEye />
                            }
                        </button>

                    </div>

                    {/* Login */}

                    <button
                        type="submit"
                        disabled={loading}
                        className="
                            w-full
                            py-3
                            rounded-xl
                            text-white
                            font-semibold
                            bg-gradient-to-r
                            from-violet-600
                            to-pink-500
                            hover:scale-[1.02]
                            transition
                            disabled:opacity-60
                        "
                    >
                        {
                            loading
                                ? "Logging in..."
                                : "Login"
                        }
                    </button>

                </form>

                <p className="text-center mt-8 text-gray-500">

                    Don't have an account?

                    <Link
                        to="/register"
                        className="
                            ml-2
                            font-semibold
                            text-violet-600
                        "
                    >
                        Register
                    </Link>

                </p>

            </div>

        </div>

    );

}