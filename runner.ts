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

    public start() {
        // Two options: mini game mode
        let gameLost = false;
        let gameComplete = false;

        const lose = () => gameLost = true;
        const finish = () => gameComplete = true;
        const message = "Press any button to Start!";

        // basic game loop
        game.pushScene();
        let myGame = Math.pickRandom(this.gameCollection);
        gameLost = false;
        gameComplete = false;

        myGame.tutorial();
        game.splash("Press any button to Start!");
        control.runInParallel(() => myGame.onMiniGameStart(finish));

        // handle finishing early 
        game.onUpdate(() => {
            if (gameComplete) {
                info.stopCountdown();
                this.score += myGame.end(lose)
            }
            if (gameLost || gameComplete) {
                game.popScene();
                this.lives--;
                // todo: lose lives animation
            }
        })

        // finish after time limit up
        info.startCountdown(5);
        info.onCountdownEnd(() => {
            this.score += myGame.end(lose)
            info.stopCountdown();
        });
        // \end basic game loop
    }

    private startSingleMiniGame(game: MiniGame) {

    }
}
