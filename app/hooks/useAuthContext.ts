import { useOutletContext } from "react-router";
import type { UserProfile } from "~/services/profileService";

export interface AuthOutletContext {
    profile: UserProfile;
}

export function useAuthContext() {
    const context =  useOutletContext<AuthOutletContext | undefined>();

    if (!context) {
        throw new Error("useAuthContext must be used within an Authenticated Route");
    }

    return context;
}
