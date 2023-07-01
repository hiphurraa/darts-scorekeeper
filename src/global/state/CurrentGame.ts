const CURRENT_GAME: string = "darts-scorekeeper-current-game";

declare interface Throw {
    score: number,
    factor: number,
}
declare interface Turn {
    throw1: Throw | null
    throw2: Throw | null,
    throw3: Throw | null,
    player: Player,
}

declare interface Game {
    players: Player[],
    turns: Turn[],
    finished: boolean,
}

function loadCurrentGame (): Game {
    let storageItem = localStorage.getItem(CURRENT_GAME);
    if (storageItem) {
        try {
            return JSON.parse(storageItem);
        } catch(error) {
            return null;
        }
    }
    return null;
}

let currentGame: Game = loadCurrentGame();

function saveGame () {
    localStorage.setItem(CURRENT_GAME, JSON.stringify(currentGame));
}

function createNewGame(players: Player[]) {
    currentGame = {players, turns: [{player: players[0], throw1: null, throw2: null, throw3: null}], finished: false};
    saveGame();
}

function newTurn() {
    let nextPlayerIdx = 0;

    let currentPlayerIdx = currentGame.players.findIndex((player: Player) => {
        return player.id === currentGame.turns[currentGame.turns.length-1].player.id;
    });

    if (currentPlayerIdx !== currentGame.players.length-1) {
        nextPlayerIdx = currentPlayerIdx + 1;
    }

    let nextPlayer: Player = currentGame.players[nextPlayerIdx];

    currentGame.turns.push({
        throw1: null,
        throw2: null,
        throw3: null,
        player: nextPlayer,
    });
    saveGame();
}

function previousTurn() {

}

function resetDefaultCurrentGame() {
    localStorage.setItem(CURRENT_GAME, JSON.stringify(null));
}