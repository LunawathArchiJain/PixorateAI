import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff, FiUser, FiMail, FiLock } from "react-icons/fi";
import toast from "react-hot-toast";

import { register } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

export default function RegisterForm() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [loading, setLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (
            !formData.name ||
            !formData.email ||
            !formData.password ||
            !formData.confirmPassword
        ) {

            return toast.error("Please fill all fields.");

        }

        if (formData.password !== formData.confirmPassword) {

            return toast.error("Passwords do not match.");

        }

        if (formData.password.length < 6) {

            return toast.error("Password should be at least 6 characters.");

        }

        try {

            setLoading(true);

            const response = await register({

                name: formData.name,
                email: formData.email,
                password: formData.password

            });

            login(
                response.token,
                response.user
            );

            toast.success("Registration Successful!");

            navigate("/dashboard");

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Registration Failed"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="flex items-center justify-center px-8 py-16">

            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-10">

                <h2 className="text-3xl font-bold">

                    Create Account

                </h2>

                <p className="text-gray-500 mt-2">

                    Join Pixora AI today.

                </p>

                <form
                    onSubmit={handleSubmit}
                    className="mt-8 space-y-5"
                >

                    {/* Name */}

                    <div className="relative">

                        <FiUser className="absolute left-4 top-4 text-gray-400"/>

                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={formData.name}
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

                    {/* Email */}

                    <div className="relative">

                        <FiMail className="absolute left-4 top-4 text-gray-400"/>

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

                        <FiLock className="absolute left-4 top-4 text-gray-400"/>

                        <input
                            type={showPassword ? "text" : "password"}
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
                                    ? <FiEyeOff/>
                                    : <FiEye/>
                            }
                        </button>

                    </div>

                    {/* Confirm Password */}

                    <div className="relative">

                        <FiLock className="absolute left-4 top-4 text-gray-400"/>

                        <input
                            type={
                                showConfirmPassword
                                    ? "text"
                                    : "password"
                            }
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
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
                                setShowConfirmPassword(
                                    !showConfirmPassword
                                )
                            }
                            className="absolute right-4 top-4"
                        >
                            {
                                showConfirmPassword
                                    ? <FiEyeOff/>
                                    : <FiEye/>
                            }
                        </button>

                    </div>

                    {/* Button */}

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
                                ? "Creating Account..."
                                : "Create Account"
                        }

                    </button>

                </form>

                <p className="text-center mt-8 text-gray-500">

                    Already have an account?

                    <Link
                        to="/login"
                        className="
                            ml-2
                            font-semibold
                            text-violet-600
                        "
                    >
                        Login
                    </Link>

                </p>

            </div>

        </div>

    );

}