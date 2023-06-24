const PAGE_SETTINGS: string = "darts-scorekeeper-pagesettings";

declare interface PageSettings {
    theme: string,
    language: string
}

const defaultPageSettings: PageSettings = {
    theme: 'dark',
    language: 'en'
}

function loadPageSettings (): PageSettings {
    let pageSettings = defaultPageSettings;

    let local = localStorage.getItem(PAGE_SETTINGS);
    if (local) {
        try {
            pageSettings = JSON.parse(local);
        } catch(error) {
            console.error("Page settings corrupted, restoring default settings");
        }
    }

    localStorage.setItem(PAGE_SETTINGS, JSON.stringify(pageSettings));
    document.documentElement.setAttribute('data-theme', pageSettings.theme);
    return pageSettings;
}

let pageSettings: PageSettings = loadPageSettings();

function savePageSettings () {
    localStorage.setItem(PAGE_SETTINGS, JSON.stringify(pageSettings));
}