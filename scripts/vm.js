define(["knockout"], function (ko) {
    return function VM() {
        var self = this,
            timerId;

        self.grid = ko.observableArray();
        self.isPlaying = ko.observable(false);
        self.isStopped = ko.computed(function () {
            return !self.isPlaying();
        });

        self.size = ko.observable(20);
        self.speed = ko.observable(5);

        self.init = function () {
            var i, j;

            checkMaximumSize();

            self.grid([]);
            for (i = 0; i < self.size(); i += 1) {
                self.grid.push(ko.observableArray());

                for (j = 0; j < self.size(); j += 1) {
                    self.grid()[i].push(ko.observable(false));
                }
            }
        };

        self.generateRandom = function () {
            self.init();
            self.randomLife();
        }

        self.set = function (x, y, val) {
            if (val === undefined || val === null) {
                val = true;
            }

            try {
                self.grid()[x]()[y](val);
            }
            catch (e) { };
        };

        self.get = function (x, y) {
            return self.grid()[x]()[y]();
        }

        self.liveNeighbors = function (x, y) {
            var i, j, result = 0;

            for (i = -1; i <= 1; i++) {
                for (j = -1; j <= 1; j++) {
                    if (i === 0 && j === 0) {
                        continue;
                    }

                    try {
                        result += self.get(x + i, y + j) ? 1 : 0;
                    } catch (e) { };
                }
            }

            return result;
        };

        function checkMaximumSize() {
            var maxSize = 40;

            if (self.size() > maxSize) {
                self.size(maxSize);
            }
        }

        function applyRules(x, y) {
            var neighborsNo = self.liveNeighbors(x, y);

            if (neighborsNo <= 1) {
                return false;
            }

            if (neighborsNo > 3) {
                return false;
            }

            if (neighborsNo === 3) {
                return true;
            }

            return self.get(x, y);
        };

        self.next = function () {
            var nextGrid = createTemporaryNextGrid();

            copyValuesToGrid(nextGrid);
        }

        self.switch = function (obsX, obsY) {
            var oldValue, x = obsX(), y = obsY();

            oldValue = self.get(x, y);
            self.set(x, y, !oldValue);
        }

        self.play = function () {
            var timeout = 500 / self.speed();

            self.isPlaying(true);
            timerID = setInterval(self.next, timeout);
        }

        self.stop = function () {
            self.isPlaying(false);
            clearInterval(timerID);
        }

        self.speed.subscribe(function () {
            var speed = self.speed(),
                isPlaying = self.isPlaying();

            if (isNaN(speed)) {
                self.speed(5);
            }
            else if (speed < 1) {
                self.speed(1);
            }
            else if (speed > 10) {
                self.speed(10);
            }

            if (isPlaying) {
                clearInterval(timerID);
                self.play();
            }
        });

        self.randomLife = function () {
            var i, j;

            for (i = 0; i < self.size(); i++) {
                for (j = 0; j < self.size(); j++) {
                    self.set(i, j, getRandomBool());
                }
            }
        }

        function createTemporaryNextGrid() {
            var i, j, newVal,
                tempGrid = ko.observableArray();

            for (i = 0; i < self.size(); i++) {
                tempGrid.push(ko.observableArray());

                for (j = 0; j < self.size(); j++) {
                    newVal = applyRules(i, j);
                    tempGrid()[i].push(ko.observable(newVal));
                }
            }

            return tempGrid;
        }

        function copyValuesToGrid(from) {
            var i, j, val;

            for (i = 0; i < from().length; i++) {
                for (j = 0; j < from()[i]().length; j++) {
                    val = from()[i]()[j]();

                    self.set(i, j, val);
                }
            }
        }

        function getRandomBool() {
            return Math.random() * 2 < 1;
        }
    };
});