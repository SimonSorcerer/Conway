define(["config", "Grid"], function (config, Grid) {

    return function History(initialGrid) {
        var self = this,
            history;

        if (!initialGrid) {
            throw new Exception("History requires grid on initialization!");
        };

        history = new Array(initialGrid);
        console.log("History initializated");

        // methods
        // -------------------------------
        function get(time) {
            time = time || age() - 1;

            if (time < 0 || time >= age()) {
                throw new Exception("Reading history above boundaries!");
            }

            return history[time];
        };

        function generateNext(rules) {
            var state, neighbors, grid;

            grid = initNextState();

            for (var i = 0; i < rules.length; i++) {
                for (var j = 0; j < grid.size.x() ; j++) {
                    for (var k = 0; k < grid.size.y() ; k++) {
                        state = grid.get(k, j);
                        neighbors = grid.filterNeighbors(k, j, config.constants.state.alive);

                        grid.set(k, j, rules[i](state, neighbors));
                    }
                }
            }
        };

         function age() {
            return history.length;
        };

        function getLatestState() {
            if (history && history.length > 0) {
                return history[history.length - 1];
            }
            throw new Exception("History not initialized!");
        }

        function initNextState() {
            var newGrid,
                oldGrid = getLatestState();

            newGrid = new Grid();
            newGrid.clone(oldGrid);

            history.push(newGrid);
            return newGrid;
        };

        return {
            get: get,
            next: generateNext,
            age: age
        }
    }
});