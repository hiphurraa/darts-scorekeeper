const GAME_SETTINGS: string = "darts-scorekeeper-game-settings";

declare interface Player {
    id: number,
    name: string
    selected: boolean,
}

declare interface GameSettings {
    startingPoints: number,
    startsWithDouble: boolean
    players: Player[],
}

const defaultGameSettings: GameSettings = {
    startingPoints: 501,
    startsWithDouble: false,
    players: [{id: 0, name: 'Tomi', selected: false}, {id: 1, name: 'Teppo', selected: false}, {id: 2, name: 'Pete', selected: false}]
}

function loadGameSettings (): GameSettings {
    let storageItem = localStorage.getItem(GAME_SETTINGS);
    if (storageItem) {
        try {
            return JSON.parse(storageItem);
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

function resetDefaultGameSettings() {
    localStorage.setItem(GAME_SETTINGS, JSON.stringify(defaultGameSettings));
}