var translationMixin = {
    methods: {
        t() {
            if (arguments.length < 1) {
                return "???";
            }

            let result = this[arguments[0]][applicationSettings.language];

            if (!result) {
                return "???"
            }

            // Replace the placeholders with the arguments
            for (let i = 1; i < arguments.length; i++) {
                result = result.replaceAll("{" + (i - 1) + "}", arguments[i]);
            }

            return result;
        }
    },
    data() {
        return {
            "mainmenu.header.darts": {
                fi: "DARTS",
                en: "DARTS",
            },
            "mainmenu.header.scorekeeper": {
                fi: "PISTELASKURI",
                en: "SCOREKEEPER",
            },
            "mainmenu.button.new_game": {
                fi: "Uusi peli",
                en: "New game"
            },
            "mainmenu.button.settings": {
                fi: "Asetukset",
                en: "Settings"
            },
            "mainmenu.text.continue_game_prompt": {
                fi: "Jatka keskeytettyä peliä?",
                en: "Continue the earlier game?"
            },
            "button.continue": {
                fi: "Jatka",
                en: "Continue"
            }
        };
    },
}