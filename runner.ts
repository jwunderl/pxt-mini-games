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
        const message = "Press any button to Start!";
        const selectedGame = Math.pickRandom(this.gameCollection);

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


        control.runInParallel(() => selectedGame.onMiniGameStart(finish, lose, state));

        if (timeout > 0) {
            info.startCountdown(timeout);
            info.onCountdownEnd(finish);
        }

        pauseUntil(() => gameComplete);
        info.stopCountdown();

        this.score += selectedGame.end(lose, state);

        if (gameLost) {
            this.lives--;
            // todo: lose lives animation?
        }
    }
}
