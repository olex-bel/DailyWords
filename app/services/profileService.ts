import supabase from './supabase';
import { parseDate, sameDay } from '~/utils/date';

export type UserProfile = {
    name: string;
    last_seen_at: string | null;
};

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
    const { data, error } = await supabase
        .from('profiles')
        .select('name, last_seen_at')
        .eq('user_id', userId)
        .single();

    if (error) {
        console.error('Error fetching user profile:', error);
        return null;
    }

    return {
        name: data.name,
        last_seen_at: data.last_seen_at,
    };
}

export function isActiveToday(profile: UserProfile) {
    const lastSeenDate = parseDate(profile.last_seen_at);

    if (!lastSeenDate) {
        return false;
    }

    return sameDay(lastSeenDate, new Date());
}
