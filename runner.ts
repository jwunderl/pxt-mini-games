namespace runner {
    let gameCollection: MiniGame[] = [];

    export function registerMiniGame(
        title: string,
        description: () => void,
        setup: () => void,
        end: (lose: () => void) => number,
    ) {
        gameCollection.push(new MiniGame(description, setup, end));
    }

    export function start() {
        // Two options: mini game mode
        let accumulatedScore = 0;
        let myLives = 5;
        let gameLost = false;
        let lose = () => gameLost = true;

        // basic game loop
        game.pushScene();
        let myGame = Math.pickRandom(gameCollection);
        gameLost = false;

        myGame.description();
        controller.pauseUntilAnyButtonIsPressed();

        myGame.setup();
        info.startCountdown(10);
        info.onCountdownEnd(() => {
            accumulatedScore += myGame.end(lose);
        });

        game.popScene();

        if (gameLost) {
            myLives--;
            // lose lives animation
        }
    }
}
