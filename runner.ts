namespace runner {
    let gameCollection: MiniGame[] = [];

    export function registerMiniGame(
        title: string,
        description: () => void,
        setup: (finish: () => void) => void,
        end: (lose: () => void) => number,
    ) {
        gameCollection.push(new MiniGame(description, setup, end));
    }

    export function start() {
        // Two options: mini game mode
        let accumulatedScore = 0;
        let myLives = 5;
        let gameLost = false;
        let gameComplete = false;

        const lose = () => gameLost = true;
        const finish = () => gameComplete = true;
        const message = "Press any button to Start!";

        // basic game loop
        game.pushScene();
        let myGame = Math.pickRandom(gameCollection);
        gameLost = false;

        myGame.description();
        game.splash("Press any button to Start!");
        control.runInParallel(() => myGame.setup(finish));

        // handle finishing early 
        game.onUpdate(function () {
            if (finish) {
                info.stopCountdown();
                accumulatedScore += myGame.end(lose)
            }
        })

        // finish after time limit up
        info.startCountdown(5);
        info.onCountdownEnd(() => accumulatedScore += myGame.end(lose));

        if (gameLost) {
            game.popScene();
            myLives--;
            // lose lives animation
        }
        // \end basic game loop
    }
}
