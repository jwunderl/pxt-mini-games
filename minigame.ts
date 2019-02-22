class MiniGame {
    description: () => void;
    onStart: (finish: () => void) => void;
    end: (lost: () => void) => number;

    /**
     * @param description: function to display an introduction to the game
     * @param setup: function to run when starting this game
     * @param end: function to run when ending this game,
     *      which returns the score the player received
     */
    constructor(
        description: () => void,
        onStart: (finish: () => void) => void,
        end: (lose: () => void) => number
    ) {
        this.description = description;
        this.onStart = onStart;
        this.end = end;
    }
}