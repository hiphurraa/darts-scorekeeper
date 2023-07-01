const route_ingame = Vue.component('route_ingame', {
    template: `<div class="page-ingame">

        <div class="score-status">
            <div class="scoreboard">
                <div v-for="player in game.players" class="player" :class="{current: turn.player.id === player.id}">
                    <div class="player-info">
                        <div>{{ player.name }}</div>
                        <div>{{ getScore(player) }}</div>                    
                    </div>
                    <div v-if="turn.player.id === player.id" class="turn-info">
                        <div class="throw" :class="{empty: !turn.throw1, active: !turn.throw1}">
                            <div v-if="turn.throw1">
                                <span class="score">{{ turn.throw1.score }}</span>
                                <span class="factor">{{ turn.throw1.score }}</span>                            
                            </div>
                        </div>
                        <div class="throw" :class="{empty: !turn.throw2, active: !!turn.throw1 && !turn.throw2}">
                            <div v-if="turn.throw2">
                                <span class="score">{{ turn.throw2.score }}</span>
                                <span class="factor">{{ turn.throw2.factor }}</span>                            
                            </div>
                        </div>
                        <div class="throw" :class="{empty: !turn.throw3, active: !!turn.throw1 && !!turn.throw2 && !turn.throw3}">
                            <div v-if="turn.throw3">
                                <span class="score">{{ turn.throw3.score }}</span>
                                <span class="factor">{{ turn.throw3.factor }}</span>                            
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="score-input">
            <div class="input-row">
                <div class="input one3th miss" @click="onInput(0)">ohi</div>
                <div class="input one3th factor" :class="{active: double}" @click="on2x">2x</div>
                <div class="input one3th factor" :class="{active: triple}" @click="on3x">3x</div>
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
                <div class="input one3th cancel" @click="onCancel">peru</div>
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
            currentPlayer: null,
            scoreStatuses: [],
        };
    },
    mounted() {
        this.currentPlayer = this.game.players[0];
    },
    methods: {
        onCancel() {
            this.game.turns.pop();
        },
        onInput(score) {
            if (score === 50 || score === 25) {
                this.double = false;
                this.triple = false;
            }

            let factor = 1;

            if (this.double) {
                factor = 2;
            } else if (this.triple) {
                factor = 3;
            }

            this.double = false;
            this.triple = false;

            if (this.turn.throw1.score === null) {
                this.turn.throw1.score = score;
                this.turn.throw1.factor = factor;
            } else if (this.turn.throw2.score === null) {
                this.turn.throw2.score = score;
                this.turn.throw2.factor = factor;
            } else {
                this.turn.throw3.score = score;
                this.turn.throw3.factor = factor;
                newTurn();
            }
        },
        on2x() {
            this.triple = false;
            this.double = !this.double;
        },
        on3x() {
            this.double = false;
            this.triple = !this.triple;
        },
        onMiss() {

        },
        getScore(player: Player) {
            let score = 0;
            currentGame.turns.forEach((turn: Turn) => {
                if (turn.player.id === player.id) {
                    score += turn.throw1 ? turn.throw1.score * turn.throw1.factor : 0;
                    score += turn.throw2 ? turn.throw2.score * turn.throw2.factor : 0;
                    score += turn.throw3 ? turn.throw3.score * turn.throw3.factor : 0;
                }
            });
            return score;
        }
    },
});