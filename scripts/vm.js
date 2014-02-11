define(["knockout", "config", "grid"], function (ko, config, Grid) {
    return function VM() {
        var width, height, grid,
            self = this;

        grid = new Grid(20, 20);

        width = grid.size.x;
        height = grid.size.y;

        self.get = function (cell) {
            return grid.get(cell.x, cell.y);
        }

        self.grid = ko.computed(function () {
            var result = [];

            for (var i = 0; i < width; i++) {
                result.push([]);

                for (var j = 0; j < height; j++) {
                    if (i * j % 5 === 1) {
                        result[i].push(!grid.get(i, j));
                    } else {
                        result[i].push(grid.get(i, j));
                    }
                }
            }

            return result;
        });

        self.click = function (cell) {
            return ko.computed(function () {
                cell.switch(cell.x, cell.y);
            });
        }
    };
});