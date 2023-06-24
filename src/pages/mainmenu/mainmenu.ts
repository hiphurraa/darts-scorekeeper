let mainmenu_page = Vue.component('mainmenu_page', {
    template: `<div class="page-mainmenu"> 

    <div class="header">
        <span>DARTS</span>
        <span>SCOREKEEPER</span>
    </div>
    <div class="buttons-wrapper">
        <div class="button-m"><router-link to="newgame">Uusi peli</router-link></div>
        <div class="button-m"><router-link to="settings">Asetukset</router-link></div>
    </div>
   
    </div>`,
})