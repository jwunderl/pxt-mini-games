class GameRunner {
    protected gameCollection: MiniGame[];
    protected lives: number;
    protected score: number;

    constructor() {
        this.gameCollection = [];
        this.lives = 5;
        this.score = 0;
    }

    public registerMiniGame(options: MiniGameOptions) {
        this.gameCollection.push(new MiniGame(options));
    }

    public startRandomGame() {
        const selectedGame = this.selectRandomWithScroll();
        pause(2000);

        selectedGame.tutorial();
        game.splash("Press any button to Start!");

        game.pushScene();
        this.startSingleMiniGame(selectedGame);
        game.popScene();
    }

    private startSingleMiniGame(selectedGame: MiniGame, timeout: number = 10) {
        let gameComplete = false;
        const finish = () => gameComplete = true;
        let gameLost = false;
        const lose = () => gameLost = true;
        const state: any = {};

        control.runInParallel(
            () => selectedGame.onMiniGameStart(
                finish,
                lose,
                state
            )
        );

        if (timeout > 0) {
            info.startCountdown(timeout);
            info.onCountdownEnd(finish);
        }

        pauseUntil(() => gameComplete);
        info.stopCountdown();

        this.score += selectedGame.onMiniGameEnd(lose, state);

        if (gameLost) {
            this.lives--;
            // todo: lose lives animation?
        }
    }

    private selectRandomWithScroll(
        speed: number = 20,
        iterations: number = 10,
        speedDownChance: number = 5
    ): MiniGame {
        let count = 0;
        let selectedGameIndex: number;

        // scroll till out of iterations and icon nearly centered on screen
        while (iterations > 0 || (count % screen.height > speed << 1)) {
            const previousGameIndex = Math.floor(count / screen.height) % this.gameCollection.length;
            selectedGameIndex = (previousGameIndex + 1) % this.gameCollection.length;
            const offset = count % screen.height;

            this.gameCollection[previousGameIndex].renderIcon(offset);
            this.gameCollection[selectedGameIndex].renderIcon(offset - screen.height);

            pause(20);
            count += speed;

            if (Math.percentChance(speedDownChance)) {
                iterations--;
                speed = Math.max(1, Math.ceil(speed * .75));
            }
        }

        const selectedGame = this.gameCollection[selectedGameIndex];
        selectedGame.renderIcon();
        pause(1000);
        return selectedGame;
    }
}
