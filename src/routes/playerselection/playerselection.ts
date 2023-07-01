const route_playerselection = Vue.component('route_playerselection', {
    template: `<div class="page-playerselection">

        <NavigationHeader title="Uusi peli (2/2)"></NavigationHeader>

        <div class="page-content">
            <div class="player-list">
                <div class="header">Valitse pelaajat (valittuna: {{nSelectedPlayers}})</div>
                <div v-for="player in gameSettings.players" class="player" :class="{selected: player.selected}" 
                @click="toggleSelection(player)">
                    <div class="selection" :class="{selected: player.selected}"></div>
                    <div class="name">{{ player.name }}</div>
                    <div class="spacer"></div>
                </div>
            </div>
        
            <div @click="toAddPlayerPage" class="button-s secondary full-width">+ Luo uusi pelaaja</div>
            
            <div class="button-l continue default" @click="startGame" :class="{disabled: !isGameSettingsValid}">Aloita peli</div>
        </div>
    </div>`,
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
                this.$router.push('/ingame');
            }
        },

        toAddPlayerPage() {
            this.$router.push('/addplayer');
        },

        toggleSelection (player: Player) {
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