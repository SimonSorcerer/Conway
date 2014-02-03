define("History", ["config", "Grid"], function (config, Grid) {
    var self,
        history;

    // constructor
    // -------------------------------
    function History(initialGrid) {
        self = this;

        if (!initialGrid) {
            throw new Exception("History requires grid on initialization!");
        };

        history = new Array(initialGrid);
        console.log("History initializated");
    }

    // prototype methods
    // -------------------------------
    History.prototype.get = function (time) {
        if (time < 0 || time >= self.age()) {
            throw new Exception("Reading history above boundaries!");
        }

        return history[time];
    };

    History.prototype.generateNext = function (rules) {
        var state, neighbors, grid;
        
        grid = initNextState();

        for (var i = 0; i < rules.length; i++) {
            for (var j = 0; j < grid.size.height ; j++) {
                for (var k = 0; k < grid.size.width ; k++) {
                    state = grid.get(k, j);
                    neighbors = grid.liveNeighbors(k, j);

                    grid.set(k, j, rules[i](state, neighbors));
                }
            }
        }
    };

    History.prototype.age = function () {
        return history.length;
    };

    // private methods
    // -------------------------------

    var getLatestState = function () {
        if (history && history.length > 0) {
            return history[history.length - 1];
        }

        throw new Exception("History not initialized!");
    }

    var initNextState = function () {
        var newGrid;

        newGrid = new Grid();
        newGrid.clone(getLatestState());

        history.push(newGrid);
        return newGrid;
    };

    // module instance
    // -------------------------------

    return History;
});