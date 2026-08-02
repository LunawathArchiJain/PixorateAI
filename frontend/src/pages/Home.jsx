import Navbar from "../components/home/Navbar";
import Hero from "../components/home/Hero";
import Features from "../components/home/Features";
import Footer from "../components/home/Footer";
import BackgroundEffects from "../components/home/BackgroundEffects";

export default function Home() {
    return (
        <div className="relative min-h-screen overflow-hidden bg-[#f8f6ff]">
            <BackgroundEffects />
            <Navbar />
            <main className="relative z-10">
                <Hero />
                <Features />
            </main>     
            <Footer />
        </div>
    );
}