import { FiX } from "react-icons/fi";
import Layout from "../components/layout/Layout";
import PageHeader from "../components/common/PageHeader";
import UploadSection from "../components/dashboard/UploadSection";
import OptionsPanel from "../components/dashboard/OptionsPanel";
import GenerateSection from "../components/dashboard/GenerateSection";
import ResultsSection from "../components/dashboard/ResultsSection";
import { DashboardProvider, useDashboard } from "../context/DashboardContext";
import { useAuth } from "../context/AuthContext";

function Workspace() {
    const { user } = useAuth();
    const { selectedImage, result, clearDashboard } = useDashboard();
    return (
        <Layout>
            <PageHeader
                title={`Hi ${user?.name?.split(" ")[0] ?? "there"}, what are we creating?`}
                description="Upload an image, choose what you need, and generate."
                action={(selectedImage || result) && <button type="button" onClick={clearDashboard} className="btn btn-outline"><FiX aria-hidden="true" />Start over</button>}
            />
            <div className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
                <UploadSection />
                <div className="space-y-8">
                    <OptionsPanel />
                    <GenerateSection />
                </div>
            </div>
            <ResultsSection />
        </Layout>
    );
}

export default function Dashboard() {
    return (
        <DashboardProvider>
            <Workspace />
        </DashboardProvider>
    );
}
