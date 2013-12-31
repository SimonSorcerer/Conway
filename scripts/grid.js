define("Grid", ["config"], function(config) {
    var self = this,
        grid,
        currentFrame = 0;

    // constructor
    // -------------------------------
    function Grid(width, height, initialValue) {
        var initVal = initialValue || config.constants.state.dead,
            w = width || config.defaults.grid.width,
            h = height || config.defaults.grid.height;

        setupGrid(w, h, initVal);

        console.log("Grid initialized, dims: " + w + " x " + h + " with initial value: " + initVal);
    }

    // prototype methods
    // -------------------------------
    Grid.prototype.exist = function(x, y, time) {
        return (x >= 0 && x <= width() &&
                y >= 0 && y <= height() &&
                time >= 0 && time <= numberOfFrames());
    };

    Grid.prototype.get = function(x, y) {
        try {
            return grid[currentFrame][x][y];
        } catch(e) {
            throw "Trying to read from non-initialized grid!";
        }
    };

    Grid.prototype.set = function(x, y, val) {
        try {
            grid[currentFrame][x][y] = val;
        } catch(e) {
            throw "Trying to write into non-initialized grid!";
        }
    };

    Grid.prototype.liveNeighbors = function(x, y) {
        var result = 0;

        for (var i = -1; i <= 1; i++) {
            for (var j = -1; j <= 1; j++) {
                if (i == 0 && j == 0) {
                    break;
                }

                result += (self.get(x + i, y + j) == config.constants.state.alive) ? 1 : 0;
            }
        }

        return result;
    };

    Grid.prototype.next = function(rules) {
        var state,
            neighbors;

        addAge();

        for (var i = 0; i < rules.length; i++) {
            for (var j = 0; j < height(); j++) {
                for (var k = 0; k < width(); k++) {
                    state = self.get(k, j);
                    neighbors = self.liveNeighbors(k, j, currentFrame);

                    self.set(k, j, rules[i](state, neighbors));
                }
            }
        }
    };

    Grid.prototype.size = function() {
        return {
            x: width(),
            y: height(),
            frames: numberOfFrames()
        }
    };

    // private methods
    // -------------------------------

    var setupGrid = function(width, height, initialValue) {
        grid = [];

        grid.push([]);
        for (var i = 0; i < width; i++) {
            grid[currentFrame].push([]);
            for (var j = 0; j < height; j++) {
                grid[currentFrame][i].push(initialValue);
            }
        }
    };

    var width = function() {
        return grid ? grid[0].length : 0;
    };

    var height = function() {
        return grid ? grid[0][0].length : 0;
    };

    var numberOfFrames = function() {
        return grid ? grid.length : 0;
    };

    var addAge = function() {
        grid.push(grid[currentFrame++]);
    };

    // module instance
    // -------------------------------

    return Grid;
});