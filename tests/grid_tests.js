define(["Grid", "config", "jasmine-html"], function(Grid, config) {
    describe("New Grid by default", function() {
        var grid;

        beforeEach(function() {
            grid = new Grid();
        });

        it("is initialized with default width and height", function () {
            var width = grid.size().x,
                height = grid.size().y;

            expect(width).toBe(config.defaults.grid.width);
            expect(height).toBe(config.defaults.grid.height);
        });

        it("is initialized with default value", function () {
            for (var i = 0; i < grid.size().x; i++) {
                for (var j = 0; j < grid.size().y; j++) {
                    var value = grid.get(i, j);

                    expect(value).toBe(config.defaults.grid.state);
                }
            }
        });

        it("has only one initial frame", function () {
            var numOfFrames = grid.size().frames;

            expect(numOfFrames).toBe(1);
        })
    });

    describe("Grid get function", function() {
        var grid;

        beforeEach(function() {
            grid = new Grid(10, 10);
        });

        it("throws an exception on reading out of grid boundaries", function() {
            var functionCall = function() {
                grid.get(20, 20);
            };

            expect(functionCall).toThrow();
        });
    });

    describe("Grid set function", function() {
        var grid;

        beforeEach(function() {
            grid = new Grid(10, 10);
        });

        it("throws an exception on setting value out of grid boundaries", function () {
            var functionCall = function() {
                grid.set(20, 20, config.state.alive);
            };

            expect(functionCall).toThrow();
        });
    });
});

