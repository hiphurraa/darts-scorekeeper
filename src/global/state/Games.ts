const GAMES: string = "darts-scorekeeper-games";

declare interface Game {
    turns: {},
}

function loadGames (): Game[] {
    let savedGameSettings = localStorage.getItem(GAMES);
    if (savedGameSettings) {
        try {
            return JSON.parse(savedGameSettings);
        } catch(error) {
            console.error("Games data corrupted, restoring default settings");
        }
    }
    localStorage.setItem(GAMES, JSON.stringify([]));
    return [];
}

let games: Game[] = loadGames();

function saveGames () {
    localStorage.setItem(GAMES, JSON.stringify(games));
}