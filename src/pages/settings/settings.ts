const settings_page = Vue.component('settings_page', {
    template: `<div>
        <NavigationHeader title="Settings" previous="/"></NavigationHeader>
        <div>
            <CustomRadio title="Teema" :options="themeOptions" @selected="(o) => {themeOptions = o}"></CustomRadio>
            <CustomRadio title="Kieli" :options="languageOptions" @selected="(o) => {languageOptions = o}"></CustomRadio>
        </div>
    </div>`,
    data () {
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
    mounted () {
        this.themeOptions = this.themeOptions.map((option) => {
            option.selected = pageSettings.theme === option.value;
            return option;
        });
        this.languageOptions = this.languageOptions.map((option) => {
            option.selected = pageSettings.language === option.value;
            return option;
        });
    },
    computed: {
        theme(): boolean {
            let selected = this.themeOptions.find((o) => o.selected);
            return selected? selected.value : null;
        },
        language(): boolean {
            let selected = this.languageOptions.find((o) => o.selected);
            return selected? selected.value : null;
        },
    },
    watch: {
      theme(theme, old) {
          if (theme === null || old === null) {
              return;
          }
          pageSettings.theme = theme;
          savePageSettings();
      },
      language(language, old) {
          if (language === null || old === null) {
              return;
          }
          pageSettings.language = language;
          savePageSettings();
      }
    },
    methods: {
    }
})