const route_settings = Vue.component('route_settings', {
    template: `<div class="page-settings">
        <NavigationHeader title="Asetukset"></NavigationHeader>
        <div class="page-content">
            <CustomRadio title="Teema" :options="themeOptions" @selected="(o) => {themeOptions = o}"></CustomRadio>
            <CustomRadio title="Kieli" :options="languageOptions" @selected="(o) => {languageOptions = o}"></CustomRadio>
            <div class="button-s clear-all" @click="clearAll">Nollaa kaikki</div>
        </div>
    </div>`,
    data() {
        return {
            themeOptions: [
                {selected: false, label: "Tumma", value: 'dark'},
                {selected: false, label: "Vaalea", value: 'light'},
            ] as RadioOption[],
            languageOptions: [
                {selected: false, label: "Suomi", value: 'fi'},
                {selected: false, label: "Englanti", value: 'en'},
            ] as RadioOption[]
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
            resetDefaultApplicationSettings();
            resetDefaultCurrentGame();
            resetDefaultGameSettings();
            vibrate([300, 100, 300]);
            setTimeout(() => {
                location.reload();
            }, 700)

        }
    }
})