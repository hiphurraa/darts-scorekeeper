declare const Vue: any;
declare const VueRouter: any;

// Create a Vue Router instance
const router = new VueRouter({
    routes: [ // @ts-ignore
        {path: '/', component: mainmenu_page}, // @ts-ignore
        {path: '/newgame', component: newgame_page}, // @ts-ignore
        {path: '/settings', component: settings_page}, // @ts-ignore
    ]
});

// Create a Vue app
const app = new Vue({
    router,
    el: '#app'
});