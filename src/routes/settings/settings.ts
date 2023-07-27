const route_settings = Vue.component('route_settings', {
    template: `<div class="page-settings">

        <NavigationHeader title="Asetukset"></NavigationHeader>
        
        <div class="page-content" :class="guiState.pageAnimationDirection">
            <CustomRadio title="Teema" :options="themeOptions" @selected="(o) => {themeOptions = o}"></CustomRadio>
            <CustomRadio title="Kieli" :options="languageOptions" @selected="(o) => {languageOptions = o}"></CustomRadio>
            <div class="input-container">
                <div class="header">Kehitystoiminnot</div>
                <button class="button-s mt2" @click="clearAll">
                    Resetoi sovellus {{ resetCounter > 0? ("(" + resetCounter + "/3)") : "" }}
                </button>
                <button class="button-s mt2" @click="refreshPage">Päivitä</button>
            </div>
        </div>
    </div>`,
    mixins: [pageMixin],
    data() {
        return {
            themeOptions: [
                {selected: false, label: "Tumma", value: 'dark'},
                {selected: false, label: "Vaalea", value: 'light', disabled: true},
            ] as RadioOption[],
            languageOptions: [
                {selected: false, label: "Suomi", value: 'fi'},
                {selected: false, label: "Englanti", value: 'en', disabled: true},
            ] as RadioOption[],
            resetCounter: 0,
        }
    },
    mounted() {
        this.themeOptions = this.themeOptions.map((option) => {
            option.selected = applicationSettings.theme === option.value;
            return option;
        });
        this.languageOptions = this.languageOptions.map((option) => {
            option.selected = applicationSettings.language === option.value;
            return option;
        });
    },
    computed: {
        theme(): boolean {
            let selected = this.themeOptions.find((o) => o.selected);
            return selected ? selected.value : null;
        },
        language(): boolean {
            let selected = this.languageOptions.find((o) => o.selected);
            return selected ? selected.value : null;
        },
    },
    watch: {
        theme(theme, old) {
            if (theme === null || old === null) {
                return;
            }
            applicationSettings.theme = theme;
            saveApplicationSettings();
        },
        language(language, old) {
            if (language === null || old === null) {
                return;
            }
            applicationSettings.language = language;
            saveApplicationSettings();
        }
    },
    methods: {
        clearAll() {
            if (this.resetCounter < 3) {
                vibrate();
                this.resetCounter++;
                return;
            } else {
                this.resetCounter = 0;
            }
            resetDefaultApplicationSettings();
            resetDefaultCurrentGame();
            resetDefaultGameSettings();
            vibrate([300, 100, 300]);
            setTimeout(() => {
                location.reload();
            }, 700)

        },
        refreshPage () {
            location.reload();
        }
    }
})