function vibrate(pattern?: number | number[]) {
    if ("vibrate" in navigator) {
        navigator.vibrate(pattern ? pattern : 50);
    }
}