import { Suspense } from "react";
import { Await } from "react-router";
import { useTranslation } from "react-i18next";
import { getDailyEntries, MAX_DAILY_ENTRIES } from "~/services/entryService";
import LearningPage from "~/features/learning/components/LearningPage";
import LoadError from "~/features/learning/components/LoadError";
import type { Route } from "./+types/learning";

export async function clientLoader() {
    const words = getDailyEntries(MAX_DAILY_ENTRIES);
    return { words };
}

export default function Learning({ loaderData }: Route.ComponentProps) {
    const { t } = useTranslation();
    return (
        <>
            <title>{t("learning.meta.title")}</title>
            <meta name="description" content={t("learning.meta.description")} />
            <meta name="keywords" content={t("learning.meta.keywords")} />
            <Suspense fallback={<div className="h-full flex justify-center items-center">Loading...</div>}>
                <Await resolve={loaderData.words} errorElement={<LoadError />}>
                    {(words) => <LearningPage words={words} />}
                </Await>
            </Suspense>
        </>
    );
}
