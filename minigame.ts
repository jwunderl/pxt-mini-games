interface MiniGameOptions {
    title: string;
    tutorial: () => void;

    onMiniGameStart: (
        finish: () => void,
        lose: () => void,
        state: any
    ) => void;

    onMiniGameEnd: (
        lost: () => void,
        state: any
    ) => number;

    font?: image.Font;
    titleFont?: image.Font;
    description?: string[];
    splashScreen?: Image;
    hideTitleOnSplashScreen?: boolean
}

class MiniGame {
    title: string;
    tutorial: () => void;

    onMiniGameStart: (
        finish: () => void,
        lose: () => void,
        state: any
    ) => void;

    onMiniGameEnd: (
        lost: () => void,
        state: any
    ) => number;

    font: image.Font;
    titleFont: image.Font;
    description: string[];
    splashScreen: Image;
    hideTitleOnSplashScreen: boolean;

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
        this.onMiniGameStart = options.onMiniGameStart;
        this.onMiniGameEnd = options.onMiniGameEnd;

        // optional
        this.font = options.font ? options.font : image.font8;
        this.titleFont = options.titleFont ? options.titleFont : image.font8;
        this.description = options.description ? options.description : [];
        this.splashScreen = options.splashScreen;
        this.hideTitleOnSplashScreen = options.hideTitleOnSplashScreen || false;

    }

    renderIcon(yOffset: number = 0) {
        const background = scene.backgroundImage();
        const f = this.titleFont;
        const offset = 10;

        /** Background Image **/
        if (this.splashScreen) {
            background.drawTransparentImage(this.splashScreen, 0, yOffset);
        } else {
            background.fillRect(0, yOffset, screen.width, screen.height, 0x9);
        }

        /** Title **/
        if (!this.hideTitleOnSplashScreen) {
            background.fillRect(offset,
                yOffset + offset,
                screen.width - (offset << 1),
                f.charHeight + 6,
                0x1
            );
            background.fillRect(offset + 1,
                yOffset + offset + 1,
                screen.width - ((offset + 1) << 1),
                f.charHeight + 4,
                0xF
            );
            background.printCenter(this.title,
                yOffset + offset + 3,
                0x1
            );
        }

    }
}