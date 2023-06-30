/*
Vue.component('PlayerSelection', {
    template: `<div class="component-player-selection">
        <div class="player-list">
            <div class="header">Valitse pelaajat</div>
            <div v-for="player in gameSettings.players" class="player" :class="{selected: player.selected}" 
            @click="toggleSelection(player)">
                <div class="selection" :class="{selected: player.selected}"></div>
                <div class="name">{{ player.name }}</div>
                <div class="spacer"></div>
            </div>
        </div>
        
        <div click="toAddPlayerPage" class="button-s full-width new-player-btn">+ Luo uusi pelaaja</div>
    </div>`,
    data () {
        return {
            gameSettings: gameSettings as GameSettings,
        }
    },
    mounted () {
        this.updateValidationStatus();
    },
    methods: {
        toAddPlayerPage() {
            this.$router.push('/addplayer');
        },

        toggleSelection (player: Player) {
            player.selected = !player.selected;
            saveGameSettings();
            this.updateValidationStatus();
        },

        isAtleasOnePlayerSelected() {
            for (const player of gameSettings.players) {
                if (player.selected) {
                    return true;
                }
            }
            return false;
        },

        updateValidationStatus() {
            this.$emit('validation-status', this.isAtleasOnePlayerSelected());
        }
    }
});*/
