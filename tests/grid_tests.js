define(["Grid", "config", "helper", "jasmine-html"], function(Grid, config, helper) {
    describe("New Grid by default", function() {
        var grid;

        beforeEach(function() {
            grid = new Grid();
        });

        it("is initialized with default width and height", function () {
            var width = grid.size.x(),
                height = grid.size.y();

            expect(width).toBe(config.defaults.grid.width);
            expect(height).toBe(config.defaults.grid.height);
        });

        it("is initialized with default value", function () {
            var i, j, actual;

            for (i = 0; i < grid.size.x(); i++) {
                for (j = 0; j < grid.size.y(); j++) {
                    actual = grid.get(i, j);

                    expect(actual).toBe(config.defaults.grid.state);
                }
            }
        });
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
                grid.set(20, 20, config.constants.state.alive);
            };

            expect(actualFn).toThrow();
        });
    });

    describe("Grid switch function", function () {
        var grid;

        beforeEach(function () {
            grid = new Grid(10, 10);
        });

        it("throws an exception on switching value out of grid boundaries", function () {
            var actualFn;

            actualFn = function () {
                grid.switchState(15, 15);
            };

            expect(actualFn).toThrow();
        });

        it("changes the value of grid cell from alive to dead", function () {
            var actual;

            grid.set(4, 4, config.constants.state.alive);
            grid.switchState(4, 4);
            actual = grid.get(4, 4);

            expect(actual).toBe(config.constants.state.dead);
        });

        it("changes the value of grid cell from dead to alive", function () {
            var actual;

            grid.set(6, 6, config.constants.state.dead);
            grid.switchState(6, 6);
            actual = grid.get(6, 6);

            expect(actual).toBe(config.constants.state.alive);
        });
    });

    describe("Grid copy function", function () {
        var grid;

        beforeEach(function () {
            grid = new Grid(10, 10, config.constants.state.dead);

            this.addMatchers({
                toBeMultiDimensionalArray: function (expectedX, expectedY) {
                    if (Array.isArray(this.actual) && this.actual.length === expectedX) {
                        if (Array.isArray(this.actual[0]) && this.actual[0].length === expectedY) {
                            return true;
                        };
                    };

                    return false;
                }
            });
        });

        it("returns exact copy of internal grid", function () {
            var actual;

            grid.set(4, 4, config.constants.state.alive);
            grid.set(5, 8, config.constants.state.alive);

            actual = grid.getCopy();

            expect(actual).toBeDefined();
            expect(actual).toBeMultiDimensionalArray(10, 10);
        });

        it("changes to grid copy does not propagate to internal grid representation", function () {
            var copy, actual;

            grid.set(6, 6, config.constants.state.alive);

            copy = grid.getCopy();
            actual = copy[6][6];

            expect(actual).toBeDefined();
            expect(actual).toBe(config.constants.state.alive);

            copy[6][6] = config.constants.state.dead;
            actual = copy[6][6];
            expect(actual).toBe(config.constants.state.dead);

            actual = grid.get(6, 6);
            expect(actual).toBe(config.constants.state.alive);
        });
    });

    describe("Grid filterNeighbors function", function () {
        var grid;

        beforeEach(function () {
            grid = new Grid(10, 10, config.constants.state.alive);
        });

        it("returns a number of neighbours matching the expected value", function () {
            var actual,
                alive = config.constants.state.alive,
                dead = config.constants.state.dead;

            actual = grid.filterNeighbors(0, 0, alive);
            expect(actual).toBe(3);
            actual = grid.filterNeighbors(1, 0, alive);
            expect(actual).toBe(5);
            actual = grid.filterNeighbors(1, 1, alive);
            expect(actual).toBe(8);

            actual = grid.filterNeighbors(0, 0, dead);
            expect(actual).toBe(0);
            actual = grid.filterNeighbors(1, 0, dead);
            expect(actual).toBe(0);
            actual = grid.filterNeighbors(1, 1, dead);
            expect(actual).toBe(0);

            grid.set(0, 1, dead);

            actual = grid.filterNeighbors(0, 0, alive);
            expect(actual).toBe(2);
            actual = grid.filterNeighbors(1, 0, alive);
            expect(actual).toBe(4);
            actual = grid.filterNeighbors(1, 1, alive);
            expect(actual).toBe(7);
        });
    });

    describe("Grid clone function", function () {
        var grid;

        beforeEach(function () {
            grid = new Grid(10, 10, config.constants.state.alive);
        });

        it("changes the cell values of grid to match cloned grid cell values", function () {
            var actual,
                clonedGrid = new Grid(10, 10, config.constants.state.dead);

            actual = grid.get(2, 2);
            expect(actual).toBe(config.constants.state.alive);

            grid.clone(clonedGrid);
            actual = grid.get(2, 2);
            expect(actual).toBe(config.constants.state.dead);
        });

        it("changes the dimensions of grid to match cloned grid dimensions", function () {
            var actual,
                clonedGrid = new Grid(5, 5, config.constants.state.dead);

            actual = grid.size;
            expect(actual.x()).toBe(10);
            expect(actual.y()).toBe(10);

            grid.clone(clonedGrid);
            actual = grid.size;
            expect(actual.x()).toBe(5);
            expect(actual.y()).toBe(5);
        });
    });

});

