import { redirect } from "@sveltejs/kit";

export async function load(event) {
    const data = await event.parent();
    if (!data.session) {
        redirect(303, "/sign-in");
    }
    return data;
}