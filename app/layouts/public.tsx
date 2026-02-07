
import { Outlet, redirect } from "react-router";
import supabase from "~/services/supabase";

export async function clientLoader() {
    const { data: { session }, error } = await supabase.auth.getSession();

    if (session && !error) {
        return redirect("/dashboard");
    }

    return null;
}

export default function PublicLayout() {
    return (
        <>
            <header></header>

            <main className="w-8/9 mx-auto">
                <Outlet />
            </main>

            <footer></footer>
        </>
    );
}
