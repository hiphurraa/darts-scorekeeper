Vue.component('NavigationHeader', {
    props: {
        title: String,
        previous: String
    },
    template: `<div class="component-navigation-header">

    <div class="spacemaker"></div>
    
    <header>
        <a :href="previous" class="previous-page">
            <router-link :to="previous">
                <img v-if="theme === 'dark'" src="images/back-dark.png"/>
                <img v-else src="images/back-light.png"/>            
            </router-link>  
        </a>
        <div class="title">{{ title }}</div>    
    </header>

    </div>`,
    data () {
        return {
            theme: pageSettings.theme
        }
    },
});