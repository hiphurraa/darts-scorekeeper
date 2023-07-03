const route_addplayer = Vue.component('route_addplayer', {
    template: `<div class="page-addplayer">

        <NavigationHeader title="Uusi pelaaja"></NavigationHeader>
        
        <div class="page-content">
            <div class="input-container">
                <div class="header">Pelaajan nimi</div>
                <input ref="nameInput" autocomplete="off" type="text" v-model="name" class="text-input">
                <div v-if="validationError" class="validation-error">{{ validationError }}</div>            
            </div>
            
            <CustomRadio title="Valitse pelaaja alkavaan peliin" :options="autoSelectPlayerOptions"
                @selected="(o) => {autoSelectPlayerOptions = o}">
            </CustomRadio>
        
            <div class="button-m default add-player" :class="{disabled: !!validationError}" @click="savePlayer">Tallenna pelaaja</div>
        </div>
        
    </div>`,
    data() {
        return {
            NAME_MAX_LENGTH: 16,
            name: "",
            autoSelectPlayerOptions: [
                { selected: true, label: "Kyllä", value: true },
                { selected: false, label: "Ei", value: false }
            ] as RadioOption[],
            validationError: ""
        }
    },
    mounted () {
        this.$refs.nameInput.focus();
    },
    watch: {
        name() {
            this.validateName();
        }
    },
    methods: {
        validateName() {
            for (const player of gameSettings.players) {
                if (this.name.toLowerCase().trim() === player.name.toLowerCase()) {
                    this.validationError = "Nimi on jo käytössä!";
                    return;
                }
            }
            if (this.name.length > this.NAME_MAX_LENGTH) {
                this.validationError = `Nimi voi olla korkeintaan ${this.NAME_MAX_LENGTH} merkkiä!`;
                return;
            }

            this.validationError = "";
        },
        savePlayer() {
            let name = this.name.trim();
            let selected = this.autoSelectPlayerOptions.find(o => o.selected).value;
            if(addPlayer(name, selected)) {
                vibrate();
                router.back();
            }
        }
    }
});