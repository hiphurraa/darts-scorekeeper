const GAME_SETTINGS: string = "darts-scorekeeper-gamesettings";

declare interface GameSettings {
    startingPoints: number,
    startsWithDouble: boolean
}

const defaultGameSettings: GameSettings = {
    startingPoints: 501,
    startsWithDouble: true
}

function loadGameSettings (): GameSettings {
    let savedGameSettings = localStorage.getItem(GAME_SETTINGS);
    if (savedGameSettings) {
        try {
            return JSON.parse(savedGameSettings);
        } catch(error) {
            console.error("Game settings corrupted, restoring default settings");
        }
    }

    localStorage.setItem(GAME_SETTINGS, JSON.stringify(defaultGameSettings));
    return defaultGameSettings;
}

let gameSettings: GameSettings = loadGameSettings();

function saveGameSettings () {
    localStorage.setItem(GAME_SETTINGS, JSON.stringify(gameSettings));
}