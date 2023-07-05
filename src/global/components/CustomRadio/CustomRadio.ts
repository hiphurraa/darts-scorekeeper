declare interface RadioOption {
    selected: boolean,
    label: string,
    value: any
    disabled? : boolean
}

Vue.component('CustomRadio', {
    props: {
        title: String,
        options: Array as () => RadioOption[]
    },
    template: `<div class="component-custom-radio input-container">
        <div class="title">{{ title }}</div>
        <div class="options">
            <div v-for="item in options" class="option" :class="{selected: item.selected, disabled: item.disabled}" @click="onSelected(item)">
                {{ item.label }}
            </div>
        </div>
    </div>`,
    methods: {
        onSelected (option) {
            if (option.disabled) {
                return;
            }

            vibrate();

            this.options.forEach((item) => {
                item.selected = false;
            });

            option.selected = true;
            this.$emit('selected', this.options);
        }
    }
});





