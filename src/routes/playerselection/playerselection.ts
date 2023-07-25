const route_playerselection = Vue.component('route_playerselection', {
    template: `<div class="page-playerselection">

        <NavigationHeader title="Uusi peli (2/2)"></NavigationHeader>

        <div class="page-content" :class="guiState.pageAnimationDirection">
            <div class="input-container player-selection">
                <div class="header">Valitse pelaajat (valittuna: {{nSelectedPlayers}})</div>
                <div class="player-list">
                    <div v-for="player in gameSettings.players" class="player" 
                        :class="{selected: player.selected}" @click="toggleSelection(player)">
                        <div class="selection" :class="{selected: player.selected}"></div>
                        <div class="name">{{ player.name }}</div>
                        <div class="spacer"></div>
                    </div>
                </div>
                
            </div>
        
            <button @click="toPage('/addplayer', 'from-top')" class="button-m secondary full-width">+ Uusi pelaaja</button>
            
            <button class="button-l continue full-width default" @click="startGame" :class="{disabled: !isGameSettingsValid}">Aloita peli</button>
        </div>
    </div>`,
    mixins: [pageMixin],
    data () {
        return {
            gameSettings: gameSettings as GameSettings,
            nSelectedPlayers: 0,
            isGameSettingsValid: false,
        }
    },
    mounted () {
        this.checkGameSettings();
    },
    methods: {
        startGame() {
            if (this.isGameSettingsValid) {
                vibrate();
                let selectedPlayers = gameSettings.players.filter((player: Player) => {
                    return player.selected;
                })
                createNewGame(selectedPlayers);
                this.toPage('/ingame');
            }
        },

        toggleSelection (player: Player) {
            vibrate();
            player.selected = !player.selected;
            saveGameSettings();
            this.checkGameSettings();
        },

        checkGameSettings() {
            let nSelected = 0;

            for (const player of gameSettings.players) {
                if (player.selected) {
                    nSelected++;
                }
            }

            this.nSelectedPlayers = nSelected;
            this.isGameSettingsValid = nSelected > 0;
        },
    }
});