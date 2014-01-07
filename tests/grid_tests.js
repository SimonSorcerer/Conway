define(["Grid", "config", "helper", "jasmine-html"], function(Grid, config, helper) {
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
            var i, j, actual;

            for (i = 0; i < grid.size().x; i++) {
                for (j = 0; j < grid.size().y; j++) {
                    actual = grid.get(i, j);

                    expect(actual).toBe(config.defaults.grid.state);
                }
            }
        });

        it("has only one initial frame", function () {
            var numOfFrames;
            
            numOfFrames = grid.size().frames;

            expect(numOfFrames).toBe(1);
        })
    });

    describe("Grid get function", function() {
        var grid;

        beforeEach(function() {
            grid = new Grid(10, 10);
        });

        it("returns value on reading within grid boundaries", function () {
            var actualFn, actual, statesArray;

            actualFn = function () {
                return grid.get(5, 5);
            };

            actual = actualFn();

            statesArray = helper.simpleObjectToArray(config.constants.state);

            expect(actualFn).not.toThrow();
            expect(actual).toBeDefined();
            expect(statesArray).toContain(actual);
        });

        it("throws an exception on reading out of grid boundaries", function() {
            var actualFn;

            actualFn = function () {
                grid.get(20, 20);
            };

            expect(actualFn).toThrow();
        });
    });

    describe("Grid set function", function() {
        var grid;

        beforeEach(function() {
            grid = new Grid(10, 10);
        });

        it("throws an exception on setting value out of grid boundaries", function () {
            var actualFn;

            actualFn = function () {
                grid.set(20, 20, config.state.alive);
            };

            expect(actualFn).toThrow();
        });
    });
});

