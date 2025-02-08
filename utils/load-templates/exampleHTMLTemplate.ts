import { loadHTMLTemplate } from "../template-utils";

function loadExampleHTMLTemplate(
    data: { name: string; confirmationUrl: string; subject: string }, //NOTE: Change data object to match the data needed for the template
    callback: (err: Error | null, result?: string) => void
) {
    const { name, confirmationUrl, subject } = data;
    if (!name || !confirmationUrl || !subject) {
        callback(new Error("Invalid confirmation code data"), undefined);
        return;
    }
    loadHTMLTemplate("email-template.html", data, callback);
}

export { loadExampleHTMLTemplate };
