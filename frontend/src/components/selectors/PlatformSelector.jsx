import { useDashboard } from "../../context/DashboardContext";

import {

    FaInstagram,
    FaLinkedin,
    FaFacebook,
    FaYoutube,
    FaPinterest,
    FaGlobe

} from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";
import { FiShoppingBag } from "react-icons/fi";

const platforms = [

    {
        id: "instagram",
        name: "Instagram",
        icon: <FaInstagram />
    },

    {
        id: "linkedin",
        name: "LinkedIn",
        icon: <FaLinkedin />
    },

    {
        id: "twitter",
        name: "Twitter",
        icon: <FaXTwitter />
    },

    {
        id: "facebook",
        name: "Facebook",
        icon: <FaFacebook />
    },

    {
        id: "youtube",
        name: "YouTube",
        icon: <FaYoutube />
    },

    {
        id: "pinterest",
        name: "Pinterest",
        icon: <FaPinterest />
    },

    {
        id: "website",
        name: "Website",
        icon: <FaGlobe />
    },

    {
        id: "product",
        name: "Product",
        icon: <FiShoppingBag />
    }

];

export default function PlatformSelector() {

    const {

        platform,
        setPlatform

    } = useDashboard();

    return (

        <div className="mt-10">

            <h2 className="text-2xl font-semibold mb-5">

                Select Platform

            </h2>

            <div className="flex flex-wrap gap-4">

                {

                    platforms.map((item) => (

                        <button

                            key={item.id}

                            onClick={() => setPlatform(item.id)}

                            className={`
                                flex
                                items-center
                                gap-3
                                px-5
                                py-3
                                rounded-full
                                transition-all
                                border

                                ${
                                    platform === item.id
                                        ? "bg-violet-600 text-white border-violet-600"
                                        : "bg-white hover:border-violet-500"
                                }

                            `}

                        >

                            <span
                                className={`text-xl transition-colors ${
                                    platform === item.id
                                        ? "text-white"
                                        : "text-violet-600"
                                }`}
                            >
                                {item.icon}
                            </span>

                            {item.name}

                        </button>

                    ))

                }

            </div>

        </div>

    );

}