let route_mainmenu = Vue.component('route_mainmenu', {
    template: `<div class="page-mainmenu"> 
        <div class="header">
            <span>DARTS</span>
            <span>PISTELASKURI</span>
        </div>
        <div class="buttons-wrapper">
            <div class="button-l default" @click="toGameCreation">Uusi peli</div>
            <div class="button-l mt4" @click="toSettings">Asetukset</div>
        </div>
        <div v-if="showContinueGamePrompt" class="continue-game-prompt">
                <div class="prompt-text">Jatka aiemmin kesken jäänyttä peliä?</div>
                <div class="button-s default" @click="continueUnfinishedGame">Jatka</div>
            </div>
    </div>`,
    data () {
      return {
          showContinueGamePrompt: false,
      };
    },
    mounted () {
        if(currentGame && !currentGame.finished) {
            this.showContinueGamePrompt = true;
        }
    },
    methods: {
        toGameCreation() {
            vibrate();
            router.push("/newgame");
        },
        toSettings() {
            vibrate();
            router.push("/settings");
        },
        continueUnfinishedGame() {
            vibrate();
            router.push("/ingame");
        }
    },
})