Vue.component('NavigationHeader', {
    props: {
        title: String, // title to be shown on the header
        previousExecute: () => {
        }, // method, if provided, overrides default functionality when clicking back btn
    },
    template: `<div class="component-navigation-header">

    <div class="spacemaker"></div>
    
    <header>
        <div class="previous-page" @click="onPrevious">
             <
        </div>
        <div class="title">{{ title }}</div>    
    </header>

    </div>`,
    data() {
        return {
            theme: applicationSettings.theme,
            guiState: guiState
        }
    },
    methods: {
        onPrevious() {
            vibrate();
            guiState.pageAnimationDirection = "from-left";
            if (!!this.previousExecute) {
                this.previousExecute();
            } else {
                router.back();
            }
        },
    }
});