declare const Vue: any;
declare const VueRouter: any;

// Create a Vue Router instance
const router = new VueRouter({
    routes: [ // @ts-ignore
        {path: '/', component: route_mainmenu}, // @ts-ignore
        {path: '/newgame', component: route_newgame}, // @ts-ignore
        {path: '/playerselection', component: route_playerselection}, // @ts-ignore
        {path: '/settings', component: route_settings}, // @ts-ignore
        {path: '/ingame', component: route_ingame}, // @ts-ignore
        {path: '/addplayer', component: route_addplayer}, // @ts-ignore
    ]
});

// Create a Vue app
const app = new Vue({
    router,
    el: '#app'
});