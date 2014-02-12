define(["History", "Grid", "config", "helper", "mocks/gridMock", "mocks/rulesMock", "jasmine-html"], function (History, Grid, config, helper, gridMock, rulesMock) {
    describe("New History by default", function () {
        var history;

        it("requires initial grid as a parameter", function () {
            var actualFn;

            actualFn = function () {
                history = new History();
            };

            expect(actualFn).toThrow();
        });
    });

    describe("History get function", function () {
        var history,
            grid;

        beforeEach(function () {
            grid = new Grid(10, 10);
            history = new History(grid);
        });

        it("returns value on reading within grid boundaries", function () {
            var actual,
                actualFn;

            actualFn = function () {
                actual = history.get(0);
            };
            
            expect(actualFn).not.toThrow();
            expect(actual).not.toBeUndefined();
            expect(actual).toEqual(grid);
        });

        it("throws an error on reading out of history boundaries", function () {
            var actualFn;

            actualFn = function () {
                history.get(10);
            };

            expect(actualFn).toThrow();
        });

        it("returns latest grid from history on undefined time argument", function () {
            var actual;

            actual = history.get();
            expect(actual).toEqual(grid);

            history.next(rulesMock);
            actual = history.get();
            expect(actual).not.toEqual(grid);
        });
    });


    describe("History next function", function () {
        var history, grid;

        beforeEach(function () {
            grid = new Grid(10, 10, config.constants.state.alive);
            history = new History(grid);
        });

        it("increases age of history", function () {
            var oldAge, newAge;

            oldAge = history.age();
            history.next(rulesMock);
            newAge = history.age();

            expect(newAge).toEqual(oldAge + 1);
        });

        it("applies rules to next history grid", function () {
            var actual, newGrid;

            actual = grid.get(5, 6);
            expect(actual).toEqual(config.constants.state.alive);

            history.next(rulesMock);
            newGrid = history.get();

            expect(newGrid).not.toEqual(grid);

            actual = newGrid.get(5, 6);
            expect(actual).toEqual(config.constants.state.dead);
        });

        it("doesn't change existing grid history", function () {
            var oldGrid, newGrid;

            oldGrid = history.get();
            history.next(rulesMock);
            newGrid = history.get();

            expect(oldGrid).not.toEqual(newGrid);
        });
    });
});

