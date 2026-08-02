import Layout from "../components/layout/Layout";

import Greeting from "../components/dashboard/Greeting";
import UploadSection from "../components/dashboard/UploadSection";
import QuickActions from "../components/dashboard/QuickActions";
import GenerateSection from "../components/dashboard/GenerateSection";
import ResultsSection from "../components/dashboard/ResultsSection";

import PlatformSelector from "../components/selectors/PlatformSelector";
import ToneSelector from "../components/selectors/ToneSelector";
import LanguageSelector from "../components/selectors/LanguageSelector";

import { DashboardProvider, useDashboard } from "../context/DashboardContext";

function DashboardContent() {

    const {
        optionsRef,
        resultRef
    } = useDashboard();

    return (
        <Layout>
            <Greeting />
            <UploadSection />
            <div
                ref={optionsRef}
                className="mt-8"
            >
                <QuickActions />
                <PlatformSelector />
                <ToneSelector />
                <LanguageSelector />
            </div>
            <GenerateSection />
            <div
                ref={resultRef}
                className="mt-10"
            >
                <ResultsSection />
            </div>
        </Layout>
    );
}

export default function Dashboard() {
    return (
        <DashboardProvider>
            <DashboardContent />
        </DashboardProvider>
    );
}