const route_ingame = Vue.component('route_ingame', {
    template: `<div class="page-ingame" :class="guiState.pageAnimationDirection">

        <div class="ingame-page-content" ref="page">

            <div class="score-status" ref="scoreStatus">
                <div class="scoreboard" ref="scoreboard">
                    <div v-for="(player, i) in game.players" class="player" :class="{current: turn.player.id === player.id}">   
                        <div class="player-info">
                            <span class="player-order-number">{{ i+1 }}.</span>
                            <div class="name">{{ player.name }}</div>
                            <div class="total-score">{{ getScore(player) }}</div>
                        </div>
                        <div v-if="turn.player.id === player.id" class="turn-info">
                            <div class="dart" :class="{empty: !turn.darts[0], active: !waitForOk && !turn.darts[0]}">
                                <div>
                                    <span class="factor">{{ getFactor(0) }}</span>
                                    <span class="score" v-if="turn.darts[0]">{{ turn.darts[0].score }}</span>
                                    <span v-if="turn.darts.length === 1 && turn.bust" class="bust">BUST</span>
                                </div>
                            </div>
                            <div class="dart" :class="{empty: !turn.darts[1], active: !waitForOk && !!turn.darts[0] && !turn.darts[1]}">
                                <div v-if="turn.darts[0]">
                                    <span class="factor">{{ getFactor(1) }}</span>
                                    <span class="score" v-if="turn.darts[1]">{{ turn.darts[1].score }}</span>
                                    <span v-if="turn.darts.length === 2 && turn.bust" class="bust">BUST</span>
                                </div>
                            </div>
                            <div class="dart" 
                            :class="{empty: !turn.darts[2], active: !waitForOk && !!turn.darts[0] && !!turn.darts[1] && !turn.darts[2]}">
                                <div v-if="turn.darts[1]">
                                    <span class="factor">{{ getFactor(2) }}</span>
                                    <span class="score" v-if="turn.darts[2]">{{ turn.darts[2].score }}</span>
                                    <span v-if="turn.darts.length === 3 && turn.bust" class="bust">BUST</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div v-if="isGameOver" class="game-over-notification">
                    <div>Peli on päättynyt!</div>
                    <div>Pelaaja {{ turn.player.name }} voitti pelin!</div>
                    <button class="button-s default mt4" @click="toPage('/', 'from-top')">Siirry päävalikkoon</button>
                    <button class="button-s default mt4 disabled" @click="restartGame">Aloita uusi peli samoilla säännöillä ja pelaajilla</button>
                    <button class="button-s default mt4 disabled" @click="continueGameDespiteWinner">Jatka peli loppuun lopuilla pelaajilla</button>
                </div>
            </div>
            
            <div class="score-input" ref="scoreInput">
                <div class="input-row">
                    <button class="input one4th cancel" :class="{disabled: (game.turns.length === 1 && !turn.darts.length)}"
                        @click="onCancel">PERU
                    </button>
                    <button class="input one4th factor" :class="{active: double, disabled: waitForOk}" @click="on2x">2x</button>
                    <button class="input one4th factor" :class="{active: triple, disabled: waitForOk}" @click="on3x">3x</button>
                    <button class="input one4th confirm" :class="{disabled: !waitForOk || isGameOver}" @click="onOk">OK</button>
                </div>
                <div class="input-row">
                    <button class="input digit one5th" @click="onInput(1)" :class="{disabled: waitForOk}">1</button>
                    <button class="input digit one5th" @click="onInput(2)" :class="{disabled: waitForOk}">2</button>
                    <button class="input digit one5th" @click="onInput(3)" :class="{disabled: waitForOk}">3</button>
                    <button class="input digit one5th" @click="onInput(4)" :class="{disabled: waitForOk}">4</button>
                    <button class="input digit one5th" @click="onInput(5)" :class="{disabled: waitForOk}">5</button>
                </div>
                <div class="input-row">
                    <button class="input digit one5th" @click="onInput(6)" :class="{disabled: waitForOk}">6</button>
                    <button class="input digit one5th" @click="onInput(7)" :class="{disabled: waitForOk}">7</button>
                    <button class="input digit one5th" @click="onInput(8)" :class="{disabled: waitForOk}">8</button>
                    <button class="input digit one5th" @click="onInput(9)" :class="{disabled: waitForOk}">9</button>
                    <button class="input digit one5th" @click="onInput(10)" :class="{disabled: waitForOk}">10</button>
                </div>
                <div class="input-row">
                    <button class="input digit one5th" @click="onInput(11)" :class="{disabled: waitForOk}">11</button>
                    <button class="input digit one5th" @click="onInput(12)" :class="{disabled: waitForOk}">12</button>
                    <button class="input digit one5th" @click="onInput(13)" :class="{disabled: waitForOk}">13</button>
                    <button class="input digit one5th" @click="onInput(14)" :class="{disabled: waitForOk}">14</button>
                    <button class="input digit one5th" @click="onInput(15)" :class="{disabled: waitForOk}">15</button>
                </div>
                <div class="input-row">
                    <button class="input digit one5th" @click="onInput(16)" :class="{disabled: waitForOk}">16</button>
                    <button class="input digit one5th" @click="onInput(17)" :class="{disabled: waitForOk}">17</button>
                    <button class="input digit one5th" @click="onInput(18)" :class="{disabled: waitForOk}">18</button>
                    <button class="input digit one5th" @click="onInput(19)" :class="{disabled: waitForOk}">19</button>
                    <button class="input digit one5th" @click="onInput(20)" :class="{disabled: waitForOk}">20</button>
                </div>
                <div class="input-row">
                    <button class="input digit one3th miss" @click="onInput(0)" :class="{disabled: waitForOk}">0</button>
                    <button class="input digit one3th bull" @click="onInput(25)" :class="{disabled: waitForOk || triple}">25</button>
                    <button class="input digit one3th double-bull" @click="onInput(50)" :class="{disabled: waitForOk || double || triple}">50</button>
                </div>
            </div>
        </div>

        <InGameMenu v-if="!isGameOver" @to-page="toPage" @toggled="(isShown) => {this.isMenuShown = isShown}"></InGameMenu>

    </div>`,
    mixins: [pageMixin],
    data() {
        return {
            resizingEvent: null,
            game: currentGame,
            turn: currentGame.turns[currentGame.turns.length - 1] as Turn,
            double: false,
            triple: false,
            scoreStatuses: [],
            isGameOver: currentGame.finished,
            isMenuShown: false,
            startsWithDouble: currentGame.gameSettings.startsWithDouble
        };
    },
    created() {
        if (!currentGame) {
            this.toPage('/', 'from-top');
        }
    },
    computed: {
        waitForOk(): boolean {
            return this.turn.darts.length === 3 || this.getScore(this.turn.player) === 0 || this.turn.bust;
        }
    },
    watch: {
        isMenuShown(isShown) {
            const me = this;
            if (!isShown) {
                me.$refs.page.classList.add("slide-from-left");
                me.$refs.page.classList.remove("slide-to-left");
                setTimeout(() => {
                    me.$refs.page.classList.remove("slide-from-left");
                }, 300);
            } else {
                me.$refs.page.classList.add("slide-to-left");
            }
        },
    },
    mounted() {
        this.setScoreStatusHeight();
        window.addEventListener('resize', this.setScoreStatusHeight);
        this.scrollToCurrentPlayer('auto');
    },
    beforeRouteLeave (to, from, next) {
        window.removeEventListener('resize', this.setScoreStatusHeight);
        next();
    },
    methods: {
        scrollToCurrentPlayer(behavior?) {
            this.$refs.scoreboard.querySelector('.current').scrollIntoView({
                block: 'center',
                behavior: behavior? behavior : 'smooth'
            });
        },
        setScoreStatusHeight() {
            let pageHeight = this.$refs.page.clientHeight;
            let scoreInputHeight = this.$refs.scoreInput.offsetHeight;
            this.$refs.scoreStatus.style.height = `${pageHeight - scoreInputHeight}px`;
        },
        continueGameDespiteWinner() {
            alert("not implemented yet!");
        },
        restartGame() {
            alert("not implemented yet!");
        },
        hasPlayerHasDouble(player: Player) {
            // note: 50 is double 25
            for (const turn of currentGame.turns) {
                if (turn.player.name !== player.name) {
                    continue;
                }

                for (const dart of turn.darts) {
                    if (dart.factor === 2 || dart.score === 50) {
                        return true;
                    }
                }
            }
            return false;
        },
        onInput(score) {
            if (this.waitForOk || this.isGameOver) {
                return;
            } else if (this.triple && score === 25) {
                return;
            } else if ((this.double || this.triple) && score === 50) {
                return;
            }

            vibrate();

            // double-in functionality
            if (this.startsWithDouble && (!this.double && score !== 50) && !this.hasPlayerHasDouble(this.turn.player)) {
                score = 0;
                this.double = false;
                this.triple = false;
            }

            if (score === 25 && this.double) {
                score = 50;
                this.double = false;
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

            // check for bust
            let updatedScore = this.getScore(this.turn.player);
            if ((updatedScore < 2 && updatedScore !== 0) || (updatedScore === 0 && factor !== 2 && score !== 50)) {
                // was bust
                this.turn.bust = true;
            }

            saveGame();
            this.scrollToCurrentPlayer();
        },
        on2x() {
            if (this.waitForOk || this.isGameOver) {
                return;
            }

            vibrate();
            this.triple = false;
            this.double = !this.double;
            this.scrollToCurrentPlayer();
        },
        on3x() {
            if (this.waitForOk || this.isGameOver) {
                return;
            }

            vibrate();
            this.double = false;
            this.triple = !this.triple;
            this.scrollToCurrentPlayer();
        },
        onCancel() {
            const me = this;

            if (!(currentGame.turns.length > 1) && !(this.turn.darts.length)) {
                return;
            }

            vibrate();
            this.double = false;
            this.triple = false;

            if (this.isGameOver) {
                this.isGameOver = false;
                currentGame.finished = false;
            } else if (this.turn.bust) {
                this.turn.bust = false;
                this.turn.darts.pop();
            } else if (this.turn.darts.length) {
                this.turn.darts.pop();
            } else if (currentGame.turns.length > 1) {
                currentGame.turns.pop();
            }

            this.turn = currentGame.turns[currentGame.turns.length - 1]
            saveGame();
            setTimeout(me.scrollToCurrentPlayer, 20);
        },
        onOk() {
            const me = this;

            if (!this.waitForOk || this.isGameOver) {
                return;
            }

            vibrate();

            if (this.getScore(this.turn.player) === 0) {
                this.gameOver();
                return;
            }

            newTurn();
            this.turn = currentGame.turns[currentGame.turns.length - 1];
            setTimeout(me.scrollToCurrentPlayer, 20);
        },
        getFactor(dartIndex: number) {
            let dart: Dart = this.turn.darts[dartIndex];

            if (!dart && this.double) {
                return "D...";
            } else if (!dart && this.triple) {
                return "T...";
            } else if (!dart || dart.factor === 1) {
                return "";
            } else if (dart.factor === 2) {
                return "D";
            } else if (dart.factor === 3) {
                return "T";
            }
        },
        getScore(player: Player) {
            let score = currentGame.gameSettings.startingPoints;
            currentGame.turns.forEach((turn: Turn) => {
                if (turn.player.id === player.id && !turn.bust) {
                    score -= turn.darts.reduce((acc, dart) => acc + (dart.score * dart.factor), 0);
                }
            });
            return score;
        },
        gameOver() {
            this.isGameOver = true;
            currentGame.finished = true;
            saveGame();
        }
    },
});