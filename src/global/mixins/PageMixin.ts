var pageMixin = {
    data() {
        return {
            guiState: guiState,
        }
    },
    mounted() {
        if (guiState.pageAnimationDirection) {
            setTimeout(() => {
                guiState.pageAnimationDirection = null;
            }, 300);
        }
    },
    methods: {
        toPage(route: string, animation?: string) {
            vibrate();
            guiState.pageAnimationDirection = animation ? animation : "from-right";
            router.push(route);
        }
    }
}