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
        
            <div class="button-m default add-player" @click="savePlayer">Tallenna pelaaja</div>
        </div>
        
    </div>`,
    data() {
        return {
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
            let selected = this.autoSelectPlayerOptions.find(o => o.selected).value;
            if(addPlayer(name, selected)) {
                vibrate();
                router.back();
            }
        }
    }
});