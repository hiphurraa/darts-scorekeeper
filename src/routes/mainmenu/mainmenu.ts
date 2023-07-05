let route_mainmenu = Vue.component('route_mainmenu', {
    template: `<div class="page-mainmenu" :class="guiState.pageAnimationDirection">
        <div class="header">
            <span>DARTS</span>
            <span>PISTELASKURI</span>
        </div>
        <div class="buttons-wrapper">
            <div class="button-l default" @click="toPage('/newgame')">Uusi peli</div>
            <div class="button-l mt4" @click="toPage('/settings')">Asetukset</div>
        </div>
        <div v-if="showContinueGamePrompt" class="continue-game-prompt">
                <div class="prompt-text">Jatka keskeytettyä peliä?</div>
                <div class="button-s default" @click="toPage('ingame', 'from-bottom')">Jatka</div>
            </div>
    </div>`,
    mixins: [pageMixin],
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
})