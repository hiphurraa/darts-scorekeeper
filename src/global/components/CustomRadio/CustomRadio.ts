declare interface RadioOption {
    selected: boolean,
    label: string,
    value: any
}

Vue.component('CustomRadio', {
    props: {
        title: String,
        options: Array as () => RadioOption[]
    },
    template: `<div class="component-custom-radio">
        <div class="title">{{ title }}</div>
        <div class="options">
            <div v-for="item in options" class="option" :class="{selected: item.selected}" @click="onSelected(item)">
                {{ item.label }}
            </div>
        </div>
    </div>`,
    mounted () {
        console.log({mounted: this.options});
    },
    methods: {
        onSelected (option) {
            this.options.forEach((item) => {
                item.selected = false;
            });

            option.selected = true;
            this.$emit('selected', this.options);
        }
    }
});





