const newgame_page = Vue.component('newgame_page', {
    template: `<div>
    <NavigationHeader title="New game" previous="/"></NavigationHeader>
    </div>`,
    data() {
        return {
            input: '',
        }
    },
    mounted () {
        this.input = gameSettings.startingPoints;
    },
    watch: {
        input (input) {
            gameSettings.startingPoints = input;
            saveGameSettings();
        }
    }
})