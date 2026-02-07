import CardHeader from "./CardHeader";
import Button from "~/shared/components/ui/Button";
import AudioPlayer from "./AudioPlayer";
import { useTranslation } from "react-i18next";
import { getWordStyle } from "~/features/learning/utils/card";
import supabase from "~/services/supabase";
import type { Entry } from "../../../services/entryService";


type CardFrontProps = {
    entry: Entry;
    onShowTranslation?: () => void;
}

export default function CardFront({ entry, onShowTranslation }: CardFrontProps) {
    const { t } = useTranslation();
    const { content, grammar, example, audio_url } = entry;
    const style = getWordStyle(grammar);

    return (
        <div className={`h-full flex flex-col backface-hidden p-4 rotate-x-0 shadow-md ${style.shadow}`}>
            <CardHeader grammar={grammar} />
            <div className="uppercase text-4xl md:text-5xl font-extrabold text-ink text-center">
                {content}
            </div>
            <div className="flex-grow flex justify-center items-center">
                <p className="font-serif text-lg md:text-xl italic text-ink-light leading-relaxed">
                    {example}
                </p>
            </div>
            <div className="h-10 flex justify-center flex-none">
                {audio_url && <AudioPlayer url={audio_url} />}
            </div>
            <Button 
                variant="primary"
                className="py-2 w-8/9 mx-auto block mt-8"
                onClick={onShowTranslation}
            >
                {t('learning.showTranslation')}
            </Button>
        </div>
    );
}
