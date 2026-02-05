import { Suspense } from "react";
import { Await } from "react-router";
import { useTranslation } from "react-i18next";
import DashboardHero from "~/features/dashboard/components/DashboardHero";
import RecentEntries from "~/features/dashboard/components/RecentEntries";
import StatsGrid from "~/features/dashboard/components/StatsGrid";
import SmartReview from "~/features/dashboard/components/SmartReview";
import { getDashboardStats } from "~/features/dashboard/services/statsService";
import { getRecentEntries } from "~/services/entryService";
import type { Route } from "./+types/dashboard";    
import type { RecentEntry } from "~/services/entryService";

export async function clientLoader() {
    const stats = await getDashboardStats();
    let recentEntries: Promise<RecentEntry[]> | null = null; 
    
    if (!stats) {
        throw new Response('Unable to load dashboard', { status: 500 });
    }

    if (stats.user_total_words > 0) {
        recentEntries = getRecentEntries(3);
    }

    return {
        stats,
        recentEntries,
    };
}

export default function Dashboard({ loaderData }: Route.ComponentProps) {
    const { t } = useTranslation();
    const { stats, recentEntries } = loaderData;

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pt-6">
            <title>{t('dashboard.meta.title')}</title>
            <meta name="description" content={t('dashboard.meta.description')}/>
            <meta name="keywords" content={t('dashboard.meta.keywords')} />

            <DashboardHero />
            <SmartReview stats={stats} />
            <StatsGrid stats={stats} />

            {
                recentEntries && 
                    <Suspense fallback={<div className="h-full flex justify-center items-center">Loading...</div>}>
                        <Await resolve={recentEntries} errorElement={<div/>}>
                            {(entries) => <RecentEntries entries={entries} />}
                        </Await>
                    </Suspense>
            }
            
        </div>
    )
}