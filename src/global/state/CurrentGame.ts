const CURRENT_GAME: string = "darts-scorekeeper-current-game";

declare interface Dart {
    score: number,
    factor: number,
}

declare interface Turn {
    darts: Dart[]
    player: Player,
    bust: boolean
}

declare interface Game {
    players: Player[],
    turns: Turn[],
    finished: boolean,
    gameSettings: GameSettings,
}

function loadCurrentGame(): Game {
    let storageItem = localStorage.getItem(CURRENT_GAME);
    if (storageItem) {
        try {
            return JSON.parse(storageItem);
        } catch (error) {
            return null;
        }
    }
    return null;
}

let currentGame: Game = loadCurrentGame();

function saveGame() {
    localStorage.setItem(CURRENT_GAME, JSON.stringify(currentGame));
}

function createNewGame(players: Player[]) {
    currentGame = {
        players,
        turns: [{player: players[0], darts: [], bust: false}],
        finished: false,
        gameSettings: JSON.parse(JSON.stringify(gameSettings))
    };
    saveGame();
}

function newTurn() {
    let nextPlayerIdx = 0;

    let currentPlayerIdx = currentGame.players.findIndex((player: Player) => {
        return player.id === currentGame.turns[currentGame.turns.length - 1].player.id;
    });

    if (currentPlayerIdx !== currentGame.players.length - 1) {
        nextPlayerIdx = currentPlayerIdx + 1;
    }

    let nextPlayer: Player = currentGame.players[nextPlayerIdx];

    currentGame.turns.push({
        darts: [],
        player: nextPlayer,
        bust: false
    });

    saveGame();
}

function resetDefaultCurrentGame() {
    localStorage.setItem(CURRENT_GAME, JSON.stringify(null));
}