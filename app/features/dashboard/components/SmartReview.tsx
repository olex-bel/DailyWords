import { useTranslation } from "react-i18next";
import { useAuthContext } from "~/hooks/useAuthContext";
import Surface from "~/shared/components/ui/Surface";
import LinkButton from "~/shared/components/ui/LinkButton";
import ReviewMessage from "./ReviewMessage";
import { RiBookFill } from "react-icons/ri";
import { getReviewStatus } from "../utils/review";
import type { DashboardStats } from "../services/statsService";

type SmartReviewProps = {
    stats: DashboardStats;
};

export default function SmartReview({ stats }: SmartReviewProps) {
    const { t } = useTranslation();
    const { profile } = useAuthContext();
    const status = getReviewStatus(stats, profile);
    const showButton = status !== 'COMPLETED_TODAY' && status !== 'ALL_LEARNED';

    return (
        <Surface className="relative overflow-hidden border-none bg-sky-600 text-white p-8 group">
            <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-2">{t('dashboard.reviewTitle')}</h2>
                <p className="text-ink mb-6 opacity-90">
                    <ReviewMessage stats={stats} status={status} />
                </p>
                {showButton && 
                    <LinkButton 
                        to="/learning" 
                        className="bg-white text-sky-600 font-black px-8 py-4 rounded-2xl shadow-xl shadow-sky-900/20 active:scale-95 transition-all uppercase"
                    >
                        {t('dashboard.startLearning')}
                    </LinkButton>
                }
            </div>
            <RiBookFill className="absolute -right-8 -bottom-8 text-white/10 text-[200px] rotate-12 group-hover:rotate-0 transition-transform duration-700" />
        </Surface>
    );
}