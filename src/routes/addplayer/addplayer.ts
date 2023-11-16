const route_addplayer = Vue.component('route_addplayer', {
    template: `<div class="page-addplayer" :class="guiState.pageAnimationDirection">

        <NavigationHeader title="Uusi pelaaja"></NavigationHeader>
        
        <div class="page-content">
            <div class="input-container">
                <div class="header">Pelaajan nimi</div>
                <input ref="nameInput" autocomplete="off" type="text" v-model="name" class="text-input">
                <div v-if="validationError" class="validation-error">{{ validationError }}</div>            
            </div>
        
            <div class="button-m default add-player" @click="savePlayer">Tallenna pelaaja</div>
        </div>
        
    </div>`,
    mixins: [pageMixin],
    data() {
        return {
            name: "",
            validationError: ""
        }
    },
    mounted() {
        this.$refs.nameInput.focus();
    },
    watch: {
        name(name) {
            this.validationError = validatePlayerName(name);
        }
    },
    methods: {
        savePlayer() {
            this.validationError = validatePlayerName(this.name);
            if (this.validationError) {
                return;
            }

            let name = this.name.trim();
            if (addPlayer(name, true)) {
                vibrate();
                guiState.pageAnimationDirection = "from-right";
                router.back();
            }
        }
    }
});