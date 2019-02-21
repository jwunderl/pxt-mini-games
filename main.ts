// example usage: 
runner.registerMiniGame(
    "My Fantastic Mini Game",
    function description() {
        // displays the intro to the game (a splash screen / controls / tutorial)
    },
    function setup() {
        // sets up and starts the mini game
    },
    function end(lose: () => void) {
        // ends the mini game, returning the score the player has accumulated
        // can call lose(); to report that the player lost the game
        return 0;
    }
);