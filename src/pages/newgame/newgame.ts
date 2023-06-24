const newgame_page = Vue.component('newgame_page', {
    template: `<div class="page-newgame">
    <NavigationHeader title="Uusi peli" previous="/"></NavigationHeader>
    
    <div class="gamesettings-menu" :class="sliderPosition">
        <div class="menu-section">
            <CustomRadio title="Aloituspisteet" :options="startingPointsOptions" 
                @selected="(o) => {startingPointsOptions = o}">
            </CustomRadio>
            <CustomRadio title="Alkaa tuplalla" :options="startsWithDoubleOptions" 
                @selected="(o) => {startsWithDoubleOptions = o}">
            </CustomRadio>
        </div>
        
        <div class="menu-section">
            <CustomRadio title="Aloituspisteet 2" :options="startingPointsOptions" 
                @selected="(o) => {startingPointsOptions = o}">
            </CustomRadio>
            <CustomRadio title="Alkaa tuplalla 2" :options="startsWithDoubleOptions"
                @selected="(o) => {startsWithDoubleOptions = o}">
            </CustomRadio>
        </div>    
    </div>
    
    
    <div class="button-m continue" @click="toggle">Jatka</div>
    
    </div>`,
    methods: {
        toggle() {
            this.sliderPosition === 'two'? this.sliderPosition = 'one' : this.sliderPosition = 'two';
        }
    },
    data() {
        return {
            startsWithDoubleOptions: [
                {selected: false, label: "Kyllä", value: true},
                {selected: false, label: "Ei", value: false}
            ],
            startingPointsOptions: [
                {selected: false, label: "501", value: 501},
                {selected: false, label: "301", value: 301}
            ],
            sliderPosition: 'one',
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
            return selected? selected.value : null;
        },
        startsWithDouble(): boolean {
            let selected = this.startsWithDoubleOptions.find((option) => option.selected);
            return selected? selected.value : null;
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