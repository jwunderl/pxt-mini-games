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

        let lose = () => gameLost = true;
        let finish = () => gameComplete = true;

        // basic game loop
        game.pushScene();
        let myGame = Math.pickRandom(gameCollection);
        gameLost = false;

        myGame.description();
        controller.pauseUntilAnyButtonIsPressed();

        control.runInParallel(() => myGame.setup(finish));
        // finish after countdown
        info.startCountdown(10);

        game.onUpdate(function () {
            if (finish) {
                // handle finishing early 
            }
        })

        // handle finishing at given time
        info.onCountdownEnd(() => accumulatedScore += myGame.end(lose));

        game.popScene();

        if (gameLost) {
            myLives--;
            // lose lives animation
        }
        // \end basic game loop
    }
}
