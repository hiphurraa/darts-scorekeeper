const route_ingame = Vue.component('route_ingame', {
    template: `<div class="page-ingame">

        <div class="score-status">
            <div class="scoreboard">
                <div v-for="(player, i) in game.players" class="player" :class="{current: turn.player.id === player.id}">   
                    <div class="player-info">
                        <span class="player-order-number">{{ i+1 }}.</span>
                        <div class="name">{{ player.name }}</div>
                        <div class="total-score">{{ getScore(player) }}</div>
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
                <div class="input one4th factor" :class="{active: double, disabled: disableDigits}" @click="on2x">2x</div>
                <div class="input one4th factor" :class="{active: triple, disabled: disableDigits}" @click="on3x">3x</div>
                <div class="input one4th confirm" :class="{disabled: turn.darts.length !== 3}" @click="nextTurn">OK</div>
            </div>
            <div class="input-row">
                <div class="input digit one5th" @click="onInput(1)" :class="{disabled: disableDigits}">1</div>
                <div class="input digit one5th" @click="onInput(2)" :class="{disabled: disableDigits}">2</div>
                <div class="input digit one5th" @click="onInput(3)" :class="{disabled: disableDigits}">3</div>
                <div class="input digit one5th" @click="onInput(4)" :class="{disabled: disableDigits}">4</div>
                <div class="input digit one5th" @click="onInput(5)" :class="{disabled: disableDigits}">5</div>
            </div>
            <div class="input-row">
                <div class="input digit one5th" @click="onInput(6)" :class="{disabled: disableDigits}">6</div>
                <div class="input digit one5th" @click="onInput(7)" :class="{disabled: disableDigits}">7</div>
                <div class="input digit one5th" @click="onInput(8)" :class="{disabled: disableDigits}">8</div>
                <div class="input digit one5th" @click="onInput(9)" :class="{disabled: disableDigits}">9</div>
                <div class="input digit one5th" @click="onInput(10)" :class="{disabled: disableDigits}">10</div>
            </div>
            <div class="input-row">
                <div class="input digit one5th" @click="onInput(11)" :class="{disabled: disableDigits}">11</div>
                <div class="input digit one5th" @click="onInput(12)" :class="{disabled: disableDigits}">12</div>
                <div class="input digit one5th" @click="onInput(13)" :class="{disabled: disableDigits}">13</div>
                <div class="input digit one5th" @click="onInput(14)" :class="{disabled: disableDigits}">14</div>
                <div class="input digit one5th" @click="onInput(15)" :class="{disabled: disableDigits}">15</div>
            </div>
            <div class="input-row">
                <div class="input digit one5th" @click="onInput(16)" :class="{disabled: disableDigits}">16</div>
                <div class="input digit one5th" @click="onInput(17)" :class="{disabled: disableDigits}">17</div>
                <div class="input digit one5th" @click="onInput(18)" :class="{disabled: disableDigits}">18</div>
                <div class="input digit one5th" @click="onInput(19)" :class="{disabled: disableDigits}">19</div>
                <div class="input digit one5th" @click="onInput(20)" :class="{disabled: disableDigits}">20</div>
            </div>
            <div class="input-row">
                <div class="input digit one3th miss" @click="onInput(0)" :class="{disabled: disableDigits}">0</div>
                <div class="input digit one3th bull" @click="onInput(25)" :class="{disabled: disableDigits}">25</div>
                <div class="input digit one3th double-bull" @click="onInput(50)" :class="{disabled: disableDigits}">50</div>
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
    computed: {
        disableDigits() {
            return this.turn.darts.length === 3;
        }
    },
    methods: {
        onInput(score) {
            if(this.turn.darts.length === 3) {
                return;
            }

            vibrate();

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

            // check if score went under zero and act accordingly
            if (this.getScore(this.turn.player) < 0) {
                this.turn.darts = [{score: 0, factor: 1}, {score: 0, factor: 1}, {score: 0, factor: 1}];
            }
            saveGame();
        },
        on2x() {
            if (this.turn.darts.length === 3) {
                return;
            }

            vibrate();
            this.triple = false;
            this.double = !this.double;
        },
        on3x() {
            if (this.turn.darts.length === 3) {
                return;
            }

            vibrate();
            this.double = false;
            this.triple = !this.triple;
        },
        onCancel() {
            if(!(currentGame.turns.length > 1) && !(this.turn.darts.length)) {
                return;
            }

            vibrate();

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
            vibrate();
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