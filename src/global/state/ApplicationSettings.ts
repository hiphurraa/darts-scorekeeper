const APPLICATION_SETTINGS: string = "darts-scorekeeper-application-settings";

declare interface ApplicationSettings {
    theme: string,
    language: string
}

const defaultApplicationSettings: ApplicationSettings = {
    theme: 'dark',
    language: 'fi'
}

function loadApplicationSettings (): ApplicationSettings {
    let settings = null;
    let storageItem = localStorage.getItem(APPLICATION_SETTINGS);
    if (storageItem) {
        try {
            settings = JSON.parse(storageItem);
        } catch(error) {
            console.error("Application settings corrupted, restoring default settings.");
        }
    }

    if (!settings) {
        settings = defaultApplicationSettings;
    }

    localStorage.setItem(APPLICATION_SETTINGS, JSON.stringify(settings));
    document.documentElement.setAttribute('data-theme', settings.theme);
    return settings;
}

let applicationSettings: ApplicationSettings = loadApplicationSettings();

function saveApplicationSettings () {
    localStorage.setItem(APPLICATION_SETTINGS, JSON.stringify(applicationSettings));
    location.reload();
}

function resetDefaultApplicationSettings() {
    localStorage.setItem(APPLICATION_SETTINGS, JSON.stringify(defaultApplicationSettings));
}