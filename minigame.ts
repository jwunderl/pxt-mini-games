interface MiniGameOptions {
    title: string;
    tutorial: () => void;
    onMiniGameStart: (finish: () => void) => void;
    end: (lost: () => void) => number;

    font?: image.Font;
    description?: string[];
    splashScreen?: Image;
}

class MiniGame {
    title: string;
    tutorial: () => void;
    onStart: (finish: () => void) => void;
    end: (lost: () => void) => number;

    font: image.Font;
    description: string[];
    splashScreen: Image;

    /**
     * @param description: function to display an introduction to the game
     * @param setup: function to run when starting this game
     * @param end: function to run when ending this game,
     *      which returns the score the player received
     */
    constructor(options: MiniGameOptions) {
        // required
        this.title = options.title;
        this.tutorial = options.tutorial;
        this.onStart = options.onMiniGameStart;
        this.end = options.end;

        // optional
        this.font = options.font ? options.font : image.font8;
        this.description = options.description ? options.description : [];
        this.splashScreen = options.splashScreen;

    }
}