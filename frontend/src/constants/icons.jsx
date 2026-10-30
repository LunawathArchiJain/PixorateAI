import { FaInstagram, FaLinkedin, FaFacebook, FaYoutube, FaPinterest, FaGlobe } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FiImage, FiBook, FiHash, FiFileText, FiGlobe, FiEdit3, FiTrendingUp, FiShoppingBag, FiVideo } from "react-icons/fi";

export const PLATFORM_ICONS = {
    instagram: <FaInstagram />,
    linkedin: <FaLinkedin />,
    twitter: <FaXTwitter />,
    facebook: <FaFacebook />,
    youtube: <FaYoutube />,
    pinterest: <FaPinterest />,
    website: <FaGlobe />,
    product: <FiShoppingBag />,
};

export const CONTENT_ICONS = {
    caption: <FiImage />,
    blog: <FiBook />,
    script: <FiVideo />,
    hashtags: <FiHash />,
    summary: <FiFileText />,
    translate: <FiGlobe />,
    rewrite: <FiEdit3 />,
    seo: <FiTrendingUp />,
};
