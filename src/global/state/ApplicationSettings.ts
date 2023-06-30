const PAGE_SETTINGS: string = "darts-scorekeeper-application-settings";

declare interface ApplicationSettings {
    theme: string,
    language: string
}

const defaultPageSettings: ApplicationSettings = {
    theme: 'dark',
    language: 'fi'
}

function loadApplicationSettings (): ApplicationSettings {
    let pageSettings = defaultPageSettings;

    let local = localStorage.getItem(PAGE_SETTINGS);
    if (local) {
        try {
            pageSettings = JSON.parse(local);
        } catch(error) {
            console.error("Application settings corrupted, restoring default settings.");
        }
    }

    localStorage.setItem(PAGE_SETTINGS, JSON.stringify(pageSettings));
    document.documentElement.setAttribute('data-theme', pageSettings.theme);
    return pageSettings;
}

let pageSettings: ApplicationSettings = loadApplicationSettings();

function savePageSettings () {
    localStorage.setItem(PAGE_SETTINGS, JSON.stringify(pageSettings));
    location.reload();
}