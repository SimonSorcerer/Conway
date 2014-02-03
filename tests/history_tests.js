define(["History", "config", "helper", "jasmine-html"], function (History, config, helper) {
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
            gridMock = [];

        beforeEach(function () {
            history = new History(gridMock);
        });

        it("returns value on reading within grid boundaries", function () {
            var actual,
                actualFn;

            actualFn = function () {
                actual = history.get(0);
            };

            expect(actualFn).not.toThrow();
            expect(actual).toBe(gridMock);
        });

        it("throws an error on reading out of history boundaries", function () {
            var actualFn;

            actualFn = function () {
                history.get(10);
            };

            expect(actualFn).toThrow();
        });
    });


    describe("History next function", function () {
        var history,
            gridMock = [[0, 0], [0, 0]],
            rulesMock = [];

        beforeEach(function () {
            history = new History(gridMock);
        });

        it("increases age of history", function () {
            var oldAge, newAge;

            oldAge = history.age();
            history.generateNext(rulesMock);
            newAge = history.age();

            expect(newAge).toEqual(oldAge + 1);
        });

        it("doesn't change existing grid history", function () {
            history.generateNext(rulesMock);
        });
    });
});

