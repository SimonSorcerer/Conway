define(["vm", "jasmine-html"], function (VM) {
    var vm;

    beforeEach(function () {
        vm = new VM();

        vm.init(3, 3);
    });

    describe("gol", function () {
        it("each cell can tell the number of living neighbors", function () {
            var actual;

            vm.set(0, 0);
            vm.set(0, 2);
            vm.set(2, 0);

            actual = vm.liveNeighbors(1, 1);
            expect(actual).toBe(3);

            actual = vm.liveNeighbors(1, 0);
            expect(actual).toBe(2);

            actual = vm.liveNeighbors(2, 2);
            expect(actual).toBe(0);
        });

        it("a live cell with no neighbors dies", function () {
            var actual;

            vm.set(0, 0);
            vm.set(0, 2);
            vm.set(2, 0);

            actual = vm.get(2, 0);
            expect(actual).toBe(true);

            vm.next();
            actual = vm.get(2, 0);
            expect(actual).toBe(false);
        });

        it("a live cell with one neighbor dies", function () {
            var actual;

            vm.set(0, 0);
            vm.set(0, 2);
            vm.set(2, 1);

            actual = vm.get(2, 1);
            expect(actual).toBe(true);

            vm.next();
            actual = vm.get(2, 1);
            expect(actual).toBe(false);
        });

        it("a live cell with two neighbors lives", function () {
            var actual;

            vm.set(0, 0);
            vm.set(0, 2);
            vm.set(1, 1);

            actual = vm.get(1, 1);
            expect(actual).toBe(true);

            vm.next();
            actual = vm.get(1, 1);
            expect(actual).toBe(true);
        });

        it("a live cell with three neighbors lives", function () {
            var actual;

            vm.set(0, 0);
            vm.set(0, 1);
            vm.set(0, 2);
            vm.set(1, 1);

            actual = vm.get(0, 1);
            expect(actual).toBe(true);

            vm.next();
            actual = vm.get(0, 1);
            expect(actual).toBe(true);
        });

        it("a live cell with more than three neighbors dies", function () {
            var actual;

            vm.set(0, 0);
            vm.set(0, 1);
            vm.set(0, 2);
            vm.set(1, 0);
            vm.set(1, 1);
            vm.set(1, 2);
            vm.set(2, 0);
            vm.set(2, 1);
            vm.set(2, 2);

            actual = vm.get(1, 1);
            expect(actual).toBe(true);

            actual = vm.get(1, 2);
            expect(actual).toBe(true);

            vm.next();
            actual = vm.get(1, 1);
            expect(actual).toBe(false);

            actual = vm.get(1, 2);
            expect(actual).toBe(false);
        });

        it("a dead cell with exactly three neighbors becomes alive", function () {
            var actual;

            vm.set(0, 0);
            vm.set(0, 2);
            vm.set(2, 1);

            actual = vm.get(1, 1);
            expect(actual).toBe(false);

            vm.next();
            actual = vm.get(1, 1);
            expect(actual).toBe(true);
        });

        it("can switch the state of the cell", function () {
            var actual,
                observedValue = 1,
                observableFn = function () { return observedValue; };

            vm.set(2, 2);

            actual = vm.get(1, 1);
            expect(actual).toBe(false);

            vm.switch(observableFn, observableFn);
            actual = vm.get(1, 1);
            expect(actual).toBe(true);

            actual = vm.get(2, 2);
            expect(actual).toBe(true);

            observedValue = 2;
            vm.switch(observableFn, observableFn);
            actual = vm.get(2, 2);
            expect(actual).toBe(false);
        });

    });
});