import { getUserProfile } from "./profileService";
import { withSessionCache } from "~/utils/withSessionCache";

export const getUserProfileCached = withSessionCache(
    async (userId: string) => {
        return getUserProfile(userId);
    },
    {
        key: (userId: string) => `user_profile_${userId}`,
        ttlMs: 30 * 60 * 1000, // 30 minutes
    }
);
