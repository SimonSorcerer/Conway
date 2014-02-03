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
                grid.switch(15, 15);
            };

            expect(actualFn).toThrow();
        });

        it("changes the value of grid cell from alive to dead", function () {
            var actual;

            grid.set(4, 4, config.constants.state.alive);
            grid.switch(4, 4);
            actual = grid.get(4, 4);

            expect(actual).toBe(config.constants.state.dead);
        });

        it("changes the value of grid cell from dead to alive", function () {
            var actual;

            grid.set(6, 6, config.constants.state.dead);
            grid.switch(6, 6);
            actual = grid.get(6, 6);

            expect(actual).toBe(config.constants.state.alive);
        });
    });
});

