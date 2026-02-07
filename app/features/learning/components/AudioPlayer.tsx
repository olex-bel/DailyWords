import { useTranslation } from 'react-i18next';
import { RiPlayLargeFill, RiPauseLargeFill } from 'react-icons/ri';
import { useState } from 'react';

type AudioPlayerProps = {
    url: string | null;
    className?: string;
};

export default function AudioPlayer({ url, className }: AudioPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const { t } = useTranslation();

    if (!url) {
        return null;
    }

    const playAudio = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const audio = new Audio(url);
        
        setIsPlaying(true);
        audio.play();
        
        audio.onended = () => setIsPlaying(false);
        audio.onerror = () => setIsPlaying(false);
    };

    return (
        <button 
            onClick={playAudio}
            className={`p-2 rounded-full transition-colors ${className || ''} ${
                isPlaying ? 'text-sky-500 bg-sky-50' : 'text-slate-400 hover:text-sky-600 hover:bg-slate-100'
            }`}
            title={t('learning.audioTitle')}
        >
            {isPlaying ? <RiPauseLargeFill className="w-6 h-6" /> : <RiPlayLargeFill className="w-6 h-6" />}
        </button>
    );
}