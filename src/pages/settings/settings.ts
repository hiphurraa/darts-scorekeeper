const settings_page = Vue.component('settings_page', {
    template: `<div>
        <NavigationHeader title="Settings" previous="/"></NavigationHeader>
        <div>
            Joopa joo
            <div v-for="item in jee">{{ item.name }}</div>
        </div>
    </div>`,
    data () {
        return {
            jee: [{name: "wuhuu"}, {name: "jahuu"}, {name: "jippii"}, {name: "jee"}]
        }
    },
    methods: {
    }
})