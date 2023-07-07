Vue.component("InGameMenu", {
    template: `<div class="component-in-game-menu">
        
        <div class="toggle-menu" :class="{open: isMenuShown}" @click="toggleMenu">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
        
        <div v-if="isMenuShown" class="menu">
            <button class="button-m secondary" @click="toPage('/', 'from-top')">Päävalikko</button>
            <button class="button-m secondary mt5" @click="toPage('/settings', 'from-right')">Asetukset</button>
        </div>
        
    </div>`,
    data () {
        return {
            isMenuShown: false,
            isDisabled: false
        };
    },
    watch: {
        isMenuShown(isShown) {
            this.$emit('toggled', isShown);
        },
    },
    methods: {
        toggleMenu() {
            const me = this;
            if (this.isDisabled) {
                return;
            }
            vibrate();
            this.isMenuShown = !this.isMenuShown;
            this.isDisabled = true;
            setTimeout(() => {
                me.isDisabled = false;
            }, 300);
        },
        toPage(route, animation) {
            this.$emit('to-page', route, animation);
        }
    }
});

