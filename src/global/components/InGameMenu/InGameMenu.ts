Vue.component("InGameMenu", {
    template: `<div class="component-in-game-menu">
        
        <div class="toggle-menu" :class="{open: isMenuShown}" @click="toggleMenu">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
        
        <div v-if="isMenuShown" class="menu">
            <div class="button-m default" @click="toPage('/', 'from-bottom')">Päävalikko</div>
            <div class="button-m default mt5" @click="toPage('/settings', 'from-right')">Asetukset</div>
        </div>
        
    </div>`,
    data () {
        return {
            isMenuShown: false,
        };
    },
    methods: {
        toggleMenu() {
            this.isMenuShown = !this.isMenuShown;
        },
        toPage(route, animation) {
            console.log({route, animation});
            this.$emit('to-page', route, animation);
        }
    }
});

