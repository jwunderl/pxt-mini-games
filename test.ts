// example usage: 
runner.registerMiniGame(
    "My Fantastic Mini Game",
    function description() {
        // displays the intro to the game (a splash screen / controls / tutorial)
    },
    function setup(finish: () => void) {
        // sets up and starts the mini game
        // if the game is finished before end is invoked,
        // can call `finish();` to report to the runner that
        // the game should end
    },
    function end(lose: () => void) {
        // ends the mini game, returning the score the player has accumulated
        // can call `lose();` to report that the player lost the game
        return 0;
    }
);