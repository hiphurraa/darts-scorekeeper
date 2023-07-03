const route_ingame = Vue.component('route_ingame', {
    template: `<div class="page-ingame">

        <div class="score-status">
            <div class="scoreboard">
                <div v-for="(player, i) in game.players" class="player" :class="{current: turn.player.id === player.id}">   
                    <div class="player-info">
                        <span class="player-order-number">{{ i+1 }}.</span>
                        <div>{{ player.name }}</div>
                        <div>{{ getScore(player) }}</div>
                    </div>
                    <div v-if="turn.player.id === player.id" class="turn-info">
                        <div class="dart" :class="{empty: !turn.darts[0], active: !turn.darts[0]}">
                            <div v-if="turn.darts[0]">
                                <span class="factor">{{ getFactor(0) }}</span>
                                <span class="score">{{ turn.darts[0].score }}</span>
                            </div>
                        </div>
                        <div class="dart" :class="{empty: !turn.darts[1], active: !!turn.darts[0] && !turn.darts[1]}">
                            <div v-if="turn.darts[1]">
                                <span class="factor">{{ getFactor(1) }}</span>
                                <span class="score">{{ turn.darts[1].score }}</span>
                            </div>
                        </div>
                        <div class="dart" 
                        :class="{empty: !turn.darts[2], active: !!turn.darts[0] && !!turn.darts[1] && !turn.darts[2]}">
                            <div v-if="turn.darts[2]">
                                <span class="factor">{{ getFactor(2) }}</span>
                                <span class="score">{{ turn.darts[2].score }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="score-input">
            <div class="input-row">
                <div class="input one4th cancel" :class="{disabled: (game.turns.length === 1 && !turn.darts.length)}" 
                    @click="onCancel">PERU
                </div>
                <div class="input one4th factor" :class="{active: double}" @click="on2x">2x</div>
                <div class="input one4th factor" :class="{active: triple}" @click="on3x">3x</div>
                <div class="input one4th confirm" :class="{disabled: turn.darts.length !== 3}" @click="nextTurn">OK</div>
            </div>
            <div class="input-row">
                <div class="input one5th" @click="onInput(1)">1</div>
                <div class="input one5th" @click="onInput(2)">2</div>
                <div class="input one5th" @click="onInput(3)">3</div>
                <div class="input one5th" @click="onInput(4)">4</div>
                <div class="input one5th" @click="onInput(5)">5</div>
            </div>
            <div class="input-row">
                <div class="input one5th" @click="onInput(6)">6</div>
                <div class="input one5th" @click="onInput(7)">7</div>
                <div class="input one5th" @click="onInput(8)">8</div>
                <div class="input one5th" @click="onInput(9)">9</div>
                <div class="input one5th" @click="onInput(10)">10</div>
            </div>
            <div class="input-row">
                <div class="input one5th" @click="onInput(11)">11</div>
                <div class="input one5th" @click="onInput(12)">12</div>
                <div class="input one5th" @click="onInput(13)">13</div>
                <div class="input one5th" @click="onInput(14)">14</div>
                <div class="input one5th" @click="onInput(15)">15</div>
            </div>
            <div class="input-row">
                <div class="input one5th" @click="onInput(16)">16</div>
                <div class="input one5th" @click="onInput(17)">17</div>
                <div class="input one5th" @click="onInput(18)">18</div>
                <div class="input one5th" @click="onInput(19)">19</div>
                <div class="input one5th" @click="onInput(20)">20</div>
            </div>
            <div class="input-row">
                <div class="input one3th miss" @click="onInput(0)">OHI</div>
                <div class="input one3th bull" @click="onInput(25)">25</div>
                <div class="input one3th double-bull" @click="onInput(50)">50</div>
            </div>
        </div>

    </div>`,
    data() {
        return {
            game: currentGame,
            turn: currentGame.turns[currentGame.turns.length - 1] as Turn,
            double: false,
            triple: false,
            scoreStatuses: [],
        };
    },
    methods: {
        onInput(score) {
            if(this.turn.darts.length === 3) {
                return;
            }

            // apply factor
            let factor = 1;
            if (score === 50 || score === 25 || score === 0) {
                // do nothing, no factor for bulls or zero
            } else if (this.double) {
                factor = 2;
            } else if (this.triple) {
                factor = 3;
            }

            // reset factors
            this.double = false;
            this.triple = false;

            // add dart
            this.turn.darts.push({score, factor});
            saveGame();
        },
        on2x() {
            if (this.turn.darts.length === 3) {
                return;
            }
            this.triple = false;
            this.double = !this.double;
        },
        on3x() {
            if (this.turn.darts.length === 3) {
                return;
            }
            this.double = false;
            this.triple = !this.triple;
        },
        onCancel() {
            this.double = false;
            this.triple = false;

            if (this.turn.darts.length) {
                this.turn.darts.pop();
            } else if (currentGame.turns.length > 1){
                currentGame.turns.pop();
            }
            this.turn = currentGame.turns[currentGame.turns.length - 1]
            saveGame();
        },
        nextTurn () {
            if (this.turn.darts.length !== 3) {
                return;
            }
            newTurn();
            this.turn = currentGame.turns[currentGame.turns.length - 1]
        },
        getFactor(dartIndex: number) {
            let dart: Dart = this.turn.darts[dartIndex];

            if (!dart && this.double) {
                return "D..";
            } else if (!dart && this.triple) {
                return "T..";
            } else if (!dart || dart.factor === 1) {
                return "";
            } else if (dart.factor === 2) {
                return "D";
            } else if (dart.factor === 3) {
                return "T";
            }
        },
        getScore(player: Player) {
            let score = gameSettings.startingPoints;
            currentGame.turns.forEach((turn: Turn) => {
                if (turn.player.id === player.id) {
                    score -= turn.darts.reduce((acc, dart) => acc + (dart.score * dart.factor), 0);
                }
            });
            return score;
        }
    },
});