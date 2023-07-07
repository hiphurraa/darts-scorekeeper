let route_mainmenu = Vue.component('route_mainmenu', {
    template: `<div class="page-mainmenu" :class="guiState.pageAnimationDirection">
        
        <div class="header">
            <span>DARTS</span>
            <span>PISTELASKURI</span>
        </div>
        
        <div class="buttons-wrapper">
            <button class="button-l default" @click="toPage('/newgame')">Uusi peli</button>
            <button class="button-l mt4" @click="toPage('/settings')">Asetukset</button>
        </div>
        
        <div v-if="showContinueGamePrompt" class="continue-game-prompt">
                <div class="prompt-text">Jatka keskeytettyä peliä?</div>
                <button class="button-s default" @click="toPage('ingame', 'from-bottom')">Jatka</button>
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