import { useState } from "react";
import { useTranslation } from "react-i18next";
import { updateCardReview } from "~/services/entryService";
import type { Answer } from "../types";

export function useEntryRating() {
    const { t } = useTranslation();
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const submitRating = async (id: number, rating: Answer, onSuccess: () => void) => {
        if (isPending) return;
        setIsPending(true);
        setError(null);

        try {
            await updateCardReview(id, rating);
            onSuccess();
        } catch (e) {
            setError(t('learning.updateError.message'));
        } finally {
            setIsPending(false);
        }
    };

    return { submitRating, isPending, error, setError };
}
