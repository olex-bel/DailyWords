import { useTranslation } from "react-i18next";
import { RiRefreshLine, RiBookShelfLine, RiTrophyLine } from "react-icons/ri";
import Button from "~/shared/components/ui/Button";
import ViewCenter from "~/shared/components/layout/ViewCenter";
import Surface from "~/shared/components/ui/Surface";
import StatBox from "./StatBox";

type SessionSummaryProps = {
    total: number;
    results: {
        known: number;
        harder: number;
        unknown: number;
    };
    onRepeat: () => void;
    onExit: () => void;
}

export default function SessionSummary({ total, results, onRepeat, onExit }: SessionSummaryProps) {
    const { t } = useTranslation();

    return (
        <ViewCenter>
            <Surface className="flex flex-col p-8 gap-8 items-center max-w-sm w-full">
                <div className="text-center space-y-2">
                    <div className="flex justify-center mb-2">
                        <div className="bg-yellow-100 p-4 rounded-full animate-bounce duration-1000">
                            <RiTrophyLine className="text-5xl text-yellow-500" />
                        </div>
                    </div>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tight uppercase">
                        {t('learning.summary.title')}
                    </h2>
                    <p className="text-slate-500 font-medium">{t('learning.summary.message')}</p>
                </div>

                <div className="grid grid-cols-3 gap-3 w-full">
                    <StatBox label={t('learning.summary.know')} value={results.known} color="bg-green-500" textColor="text-green-600" />
                    <StatBox label={t('learning.summary.hard')} value={results.harder} color="bg-orange-400" textColor="text-orange-600" />
                    <StatBox label={t('learning.summary.dontKnow')} value={results.unknown} color="bg-red-400" textColor="text-red-600" />
                </div>

                <div className="w-full pt-2">
                   <p className="text-center text-sm text-slate-400 font-bold mb-4 uppercase tracking-widest">
                      {t('learning.summary.totalCards', { total })}
                   </p>
                </div>

                <div className="flex flex-col gap-3 w-full">
                    <Button
                        onClick={onRepeat}
                        variant="primary"
                        className="
                            w-full flex items-center justify-center gap-2 py-4 uppercase
                            bg-sky-600 text-white font-black rounded-2xl 
                            shadow-[0_4px_0_0_#0369a1] active:translate-y-[4px] active:shadow-none 
                            transition-all
                        "
                    >
                        <RiRefreshLine className="text-xl" />
                        {t('learning.summary.repeatButton')}
                    </Button>

                    <Button
                        onClick={onExit}
                        className="
                            w-full flex items-center justify-center gap-2 py-4 uppercase
                            text-slate-500 font-bold rounded-2xl
                            hover:bg-slate-50 transition-colors
                        "
                    >
                        <RiBookShelfLine className="text-xl" />
                        {t('learning.summary.exitButton')}
                    </Button>
                </div>
            </Surface>
        </ViewCenter>
    );
}
