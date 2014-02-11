define(["config"], function(config) {
    'use strict';

    return function Grid(width, height, initialValue) {
        var self = this, grid;

        initialValue = initialValue || config.constants.state.dead;
        width = width || 20; //config.defaults.grid.width;
        height = height || 20; //config.defaults.grid.height;

        setup(width, height, initialValue);

        // methods
        // -------------------------------
        function get(x, y) {
            try {
                return grid[x][y];
            }
            catch (e) {
                throw "Trying to read from non-initialized grid!";
            }
        };

        function set(x, y, val) {
            try {
                grid[x][y] = val;
            }
            catch (e) {
                throw "Trying to write into non-initialized grid!";
            }
        };

        function switchState(x, y) {
            var alive = config.constants.state.alive,
                dead = config.constants.state.dead;

            try {
                grid[x][y] = (grid[x][y] === alive) ? dead : alive;
            }
            catch (e) {
                throw "Trying to read from non-initialized grid!";
            }
        };

        function liveNeighbors(x, y) {
            var result = 0;

            for (var i = -1; i <= 1; i++) {
                for (var j = -1; j <= 1; j++) {
                    if (i == 0 && j == 0) {
                        break;
                    }

                    if (self.get(x + i, y + j) == config.constants.state.alive) {
                        result += 1;
                    }
                }
            }

            return result;
        };

        function clone(gridToClone) {
            var clone = [];

            grid = gridToClone.map(function (item) {
                clone.push(item.slice(0))
            });

            return clone;
        };

        // private methods
        // -------------------------------
        function setup(width, height, initialValue) {
            grid = [];

            for (var i = 0; i < width; i++) {
                grid.push([]);
                for (var j = 0; j < height; j++) {
                    grid[i].push(initialValue);
                }
            }

            console.log("Grid initialized, dims: " + width + " x " + height + " with initial value: " + initialValue);
        };

        function getWidth() {
            return grid ? grid.length : 0;
        };

        function getHeight() {
            return grid ? grid[0].length : 0;
        };

        return {
            set: set,
            get: get,
            switchState: switchState,
            clone: clone,
            size: {
                x: getWidth(),
                y: getHeight()
            }
        }
    };
});