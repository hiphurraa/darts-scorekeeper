const newgame_page = Vue.component('newgame_page', {
    template: `<div>
    <NavigationHeader title="New game" previous="/"></NavigationHeader>
    
    <div class="gamesettings-menu">
        <CustomRadio title="Aloituspisteet" :options="startingPointsOptions" 
            @selected="(o) => {startingPointsOptions = o}">
        </CustomRadio>
        <CustomRadio title="Alkaa tuplalla" :options="startsWithDoubleOptions" 
            @selected="(o) => {startsWithDoubleOptions = o}">
        </CustomRadio>
    </div>
    
    </div>`,
    data() {
        return {
            startsWithDoubleOptions: [
                {selected: false, label: "Kyllä", value: true},
                {selected: false, label: "Ei", value: false}
            ],
            startingPointsOptions: [
                {selected: false, label: "501", value: 501},
                {selected: false, label: "301", value: 301}
            ]
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
        startingPoints(startingPoints) {
            if (startingPoints === null) {
                return;
            }
            gameSettings.startingPoints = startingPoints
            saveGameSettings();
        },
        startsWithDouble(startsWithDouble) {
            if (startsWithDouble === null) {
                return;
            }
            gameSettings.startsWithDouble = startsWithDouble;
            saveGameSettings();
        }
    }
})