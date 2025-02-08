import { loadHTMLTemplate } from "../template-utils";

function loadRegistrationHTMLTemplate(
    data: { name: string; eventDate: string; currentYear: string; subject: string },
    callback: (err: Error | null, result?: string) => void
) {
    // Perform sanitation checks
    const { name, eventDate, currentYear } = data;
    if (!name || !eventDate || !currentYear) {
        callback(new Error("Invalid registration data"), undefined);
        return;
    }

    loadHTMLTemplate("registration.html", data, callback);
}

export { loadRegistrationHTMLTemplate };
