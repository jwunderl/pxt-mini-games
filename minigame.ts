class MiniGame {
    description: () => void;
    setup: (finish: () => void) => void;
    end: (lost: () => void) => number;

    /**
     * @param description: function to display an introduction to the game
     * @param setup: function to run when starting this game
     * @param end: function to run when ending this game,
     *      which returns the score the player received
     */
    constructor(
        description: () => void,
        setup: (finish: () => void) => void,
        end: (lose: () => void) => number
    ) {
        this.description = description;
        this.setup = setup;
        this.end = end;
    }
}