const GAME_SETTINGS: string = "darts-scorekeeper-game-settings";
const NAME_MIN_LENGTH = 1;
const NAME_MAX_LENGTH = 16;

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
    players: []
}

function loadGameSettings(): GameSettings {
    let storageItem = localStorage.getItem(GAME_SETTINGS);
    if (storageItem) {
        try {
            return JSON.parse(storageItem);
        } catch (error) {
            console.error("Game settings corrupted, restoring default settings");
        }
    }

    localStorage.setItem(GAME_SETTINGS, JSON.stringify(defaultGameSettings));
    return defaultGameSettings;
}

let gameSettings: GameSettings = loadGameSettings();

function addPlayer(name: string, selected: boolean): boolean {
    if (gameSettings.players.find((p) => p.name.toLowerCase().trim() === name.toLowerCase())) {
        return false;
    } else if (name.trim().length > 16) {
        return false;
    }
    let player: Player = {
        id: (gameSettings.players.reduce((a, b) => Math.max(a, b.id), 0) + 1),
        name: name.trim(),
        selected
    };
    gameSettings.players.push(player);
    saveGameSettings();
    return true;
}

function validatePlayerName(name: string): string {
    // Check length
    if (name.length > NAME_MAX_LENGTH || name.length < NAME_MIN_LENGTH) {
        return `Nimen täytyy olla ${NAME_MIN_LENGTH}-${NAME_MAX_LENGTH} merkkiä!`;
    }

    // Check availability
    for (const player of gameSettings.players) {
        if (name.toLowerCase().trim() === player.name.toLowerCase()) {
            return "Nimi on jo käytössä!";
        }
    }

    // Passed
    return "";
}

function saveGameSettings() {
    localStorage.setItem(GAME_SETTINGS, JSON.stringify(gameSettings));
}

function resetDefaultGameSettings() {
    localStorage.setItem(GAME_SETTINGS, JSON.stringify(defaultGameSettings));
}