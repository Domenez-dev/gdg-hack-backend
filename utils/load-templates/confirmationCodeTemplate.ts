import { loadHTMLTemplate } from "../template-utils";

function loadConfirmationCodeTemplate(data: { code: string; subject: string }, callback: (err: Error | null, result?: string) => void) {
    // Perform sanitation checks
    const { code, subject } = data;
    if (!code || !subject) {
        callback(new Error("Invalid confirmation code data"), undefined);
        return;
    }

    // Proceed to load the HTML template
    loadHTMLTemplate("email-confirmation.html", data, callback);
}

export { loadConfirmationCodeTemplate };
