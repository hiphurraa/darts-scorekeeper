let route_mainmenu = Vue.component('route_mainmenu', {
    template: `<div class="page-mainmenu"> 
        <div class="header">
            <span>DARTS</span>
            <span>SCOREKEEPER</span>
        </div>
        <div class="buttons-wrapper">
            <div class="button-l default" @click="toNewGame">Uusi peli</div>
            <div class="button-l" @click="toSettings">Asetukset</div>
        </div>
    </div>`,
    methods: {
        toNewGame() {
            router.push("/newgame");
        },
        toSettings() {
            router.push("/settings");
        }
    }
})