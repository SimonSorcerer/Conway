define("Grid", ["config"], function(config) {
    var self,
        grid;

    // constructor
    // -------------------------------
    function Grid(width, height, initialValue) {
        self = this;

        var initVal = initialValue || config.constants.state.dead,
            w = width || config.defaults.grid.width,
            h = height || config.defaults.grid.height;

        setup(w, h, initVal);

        console.log("Grid initialized, dims: " + w + " x " + h + " with initial value: " + initVal);
    };

    // prototype methods
    // -------------------------------
    Grid.prototype.get = function(x, y) {
        try {
            return grid[x][y];
        }
        catch (e) {
            throw "Trying to read from non-initialized grid!";
        }
    };

    Grid.prototype.set = function(x, y, val) {
        try {
            grid[x][y] = val;
        }
        catch (e) {
            throw "Trying to write into non-initialized grid!";
        }
    };

    Grid.prototype.switch = function (x, y) {
        var alive = config.constants.state.alive,
            dead = config.constants.state.dead;

        try {
            grid[x][y] = (grid[x][y] === alive) ? dead : alive;
        }
        catch (e) {
            throw "Trying to read from non-initialized grid!";
        }
    };

    Grid.prototype.liveNeighbors = function(x, y) {
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

    Grid.prototype.size = function() {
        return {
            x: width(),
            y: height()
        }
    };

    Grid.prototype.clone = function (gridToClone) {
        var clone = [];

        grid = gridToClone.map(function (item) {
            clone.push(item.slice(0))
        });

        return clone;
    };


    // private methods
    // -------------------------------

    var setup = function(width, height, initialValue) {
        grid = [];

        for (var i = 0; i < width; i++) {
            grid.push([]);
            for (var j = 0; j < height; j++) {
                grid[i].push(initialValue);
            }
        }
    };

    var width = function() {
        return grid ? grid.length : 0;
    };

    var height = function() {
        return grid ? grid[0].length : 0;
    };

    // module instance
    // -------------------------------

    return Grid;
});