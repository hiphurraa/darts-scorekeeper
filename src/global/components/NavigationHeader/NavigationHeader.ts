Vue.component('NavigationHeader', {
    props: {
        title: String, // title to be shown on the header
        previousExecute: () => {}, // method, if provided, overrides default functionality when clicking back btn
    },
    template: `<div class="component-navigation-header">

    <div class="spacemaker"></div>
    
    <header>
        <div class="previous-page" @click="onPrevious">
                <img v-if="theme === 'dark'" src="images/back-dark.png"/>
                <img v-else src="images/back-light.png"/>
            </router-link>
        </div>
        <div class="title">{{ title }}</div>    
    </header>

    </div>`,
    data () {
        return {
            theme: applicationSettings.theme
        }
    },
    methods: {
        onPrevious() {
            vibrate();
            if (!!this.previousExecute) {
                this.previousExecute();
            } else {
                router.back();
            }
        },
    }
});