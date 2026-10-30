import { useDashboard } from "../../context/DashboardContext";
import ContentTypeSelector from "../selectors/ContentTypeSelector";
import ChipGroup from "../selectors/ChipGroup";
import { LANGUAGES, PLATFORMS, TONES } from "../../constants/options";
import { PLATFORM_ICONS } from "../../constants/icons";

export default function OptionsPanel() {
    const { contentType, setContentType, platform, setPlatform, tone, setTone, language, setLanguage } = useDashboard();
    return (
        <div className="space-y-7">
            <ContentTypeSelector value={contentType} onChange={setContentType} />
            <ChipGroup legend="Platform" options={PLATFORMS} value={platform} onChange={setPlatform} icons={PLATFORM_ICONS} />
            <ChipGroup legend="Tone" options={TONES} value={tone} onChange={setTone} />
            <ChipGroup legend="Language" options={LANGUAGES} value={language} onChange={setLanguage} />
        </div>
    );
}
