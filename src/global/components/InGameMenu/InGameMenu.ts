Vue.component("InGameMenu", {
    template: `<div class="component-in-game-menu">
        
        <div class="toggle-menu" :class="{open: isMenuShown}" @click="toggleMenu">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
        
        <div v-if="isMenuShown" class="menu">
            <div class="button-m" @click="toMainMenu">Päävalikko</div>
            <div class="button-m mt5" @click="toSettings">Asetukset</div>
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
        toMainMenu() {
            router.push("/");
        },
        toSettings () {
            router.push("/settings");
        },
    }
});

