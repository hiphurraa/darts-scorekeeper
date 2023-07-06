const route_newgame = Vue.component('route_newgame', {
    template: `<div class="page-newgame">
    <NavigationHeader title="Uusi peli (1/2)"></NavigationHeader>
        
    <div class="gamesettings-menu page-content" :class="guiState.pageAnimationDirection">
            <CustomRadio title="Aloituspisteet" :options="startingPointsOptions"
                @selected="(o) => {startingPointsOptions = o}">
            </CustomRadio>
            <CustomRadio title="Alkaa tuplalla" :options="startsWithDoubleOptions" 
                @selected="(o) => {startsWithDoubleOptions = o}">
            </CustomRadio>
            <div class="button-l default continue" @click="toPage('/playerselection')">Jatka</div>
    </div>
    
    </div>`,
    mixins: [pageMixin],
    data() {
        return {
            startsWithDoubleOptions: [
                {selected: false, label: "Kyllä", value: true},
                {selected: false, label: "Ei", value: false}
            ] as RadioOption[],
            startingPointsOptions: [
                {selected: false, label: "301", value: 301},
                {selected: false, label: "501", value: 501}
            ] as RadioOption[],
            sliderPosition: 1,
            isValid: false,
        };
    },
    mounted() {
        this.startingPointsOptions = this.startingPointsOptions.map((option) => {
            option.selected = gameSettings.startingPoints === option.value;
            return option;
        });
        this.startsWithDoubleOptions = this.startsWithDoubleOptions.map((option) => {
            option.selected = gameSettings.startsWithDouble === option.value;
            return option;
        });
    },
    computed: {
        startingPoints(): number {
            let selected = this.startingPointsOptions.find((option) => option.selected);
            return selected ? selected.value : null;
        },
        startsWithDouble(): boolean {
            let selected = this.startsWithDoubleOptions.find((option) => option.selected);
            return selected ? selected.value : null;
        }
    },
    watch: {
        startingPoints(startingPoints, old) {
            if (startingPoints === null || old === null) {
                return;
            }
            gameSettings.startingPoints = startingPoints
            saveGameSettings();
        },
        startsWithDouble(startsWithDouble, old) {
            if (startsWithDouble === null || old === null) {
                return;
            }
            gameSettings.startsWithDouble = startsWithDouble;
            saveGameSettings();
        }
    }
})