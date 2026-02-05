import { MAX_DAILY_ENTRIES } from "~/services/entryService";
import { isActiveToday } from "~/services/profileService";
import type { DashboardStats } from "../services/statsService";
import type { UserProfile } from "~/services/profileService";

export type ReviewStatus = 'CONTINUE' | 'COMPLETED_TODAY' | 'REVIEW_ONLY' | 'START_NEW' | 'ALL_LEARNED';

export function  getReviewStatus(stats: DashboardStats, profile: UserProfile): ReviewStatus 
{
    const { daily_task_total, total_system_words, user_total_words, new_today } = stats;
    const isToday = isActiveToday(profile);

    if (isToday) {
        if (daily_task_total > 0) {
            return 'CONTINUE';
        }

        return 'COMPLETED_TODAY';
    }
    
    if (daily_task_total === MAX_DAILY_ENTRIES) {
        if (new_today === 0) {
            return 'REVIEW_ONLY';
        } else {
            return 'CONTINUE';
        }
    }

    if (total_system_words > user_total_words) {
        return 'START_NEW';
    }
    
    return 'ALL_LEARNED';
};