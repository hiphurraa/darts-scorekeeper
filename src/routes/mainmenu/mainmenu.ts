let route_mainmenu = Vue.component('route_mainmenu', {
    template: `<div class="page-mainmenu" :class="guiState.pageAnimationDirection">
        
        <div class="header">
            <span>{{ t('mainmenu.header.darts') }}</span>
            <span>{{ t('mainmenu.header.scorekeeper') }}</span>
        </div>
        
        <div class="buttons-wrapper">
            <button class="button-l default" @click="toPage('/newgame')">{{ t('mainmenu.button.new_game') }}</button>
            <button class="button-l mt4" @click="toPage('/settings')">{{ t('mainmenu.button.settings') }}</button>
        </div>
        
        <div v-if="showContinueGamePrompt" class="continue-game-prompt">
                <div class="prompt-text">{{ t('mainmenu.text.continue_game_prompt') }}</div>
                <button class="button-s default" @click="toPage('ingame', 'from-bottom')">{{ t('button.continue') }}</button>
        </div>
    </div>`,
    mixins: [pageMixin, translationMixin],
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