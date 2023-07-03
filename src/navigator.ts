function vibrate(ms?: number) {
    if ("vibrate" in navigator) {
        navigator.vibrate(60);
    }
}