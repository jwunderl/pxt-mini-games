// example usage:
const runner = new GameRunner();

runner.registerMiniGame({
    title: "My Fantastic Mini Game",
    tutorial: function tutorial() {
        // displays the intro to the game (a splash screen / controls / tutorial)
        console.log("description called")
        game.splash("Hi!")
    },
    onMiniGameStart: function onMiniGameStart(finish: () => void) {
        // sets up and starts the mini game
        // if the game is finished before end is invoked,
        // can call `finish();` to report to the runner that
        // the game should end
        console.log("onMiniGameStart called");
        sprites.createProjectile(sprites.castle.heroFrontAttack1, 50, 0);
        controller.anyButton.onEvent(ControllerButtonEvent.Pressed, finish);
    },
    end: function end(lose: () => void) {
        // ends the mini game, returning the score the player has accumulated
        // can call `lose();` to report that the player lost the game
        console.log("end called");
        return 0;
    }
});

runner.start()