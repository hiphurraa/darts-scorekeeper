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
             <svg width="228" height="175" viewBox="0 0 228 175" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="15" y1="85" x2="228" y2="85" stroke="white" stroke-width="30"/>
                <line y1="-15" x2="107.589" y2="-15" transform="matrix(-0.715593 0.698517 -0.66943 -0.742875 86.99 0)" stroke="white" stroke-width="30"/>
                <line y1="-15" x2="107.589" y2="-15" transform="matrix(-0.689586 -0.724204 -0.696134 0.717912 86.1919 174.916)" stroke="white" stroke-width="30"/>
                <rect x="21.5032" y="64" width="30" height="30" transform="rotate(45.7886 21.5032 64)" fill="white"/>
            </svg>
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