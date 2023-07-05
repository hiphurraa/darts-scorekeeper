declare interface GuiState {
    pageAnimationDirection: string,
}

const DefaultGuiSettings = {
    pageAnimationDirection: null,
}

let guiState: GuiState = DefaultGuiSettings;
