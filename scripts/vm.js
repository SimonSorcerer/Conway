define(["knockout", "config", "grid", "history", "rules"], function (ko, config, Grid, History, rules) {
    return function VM() {
        var width, height, grid, history,
            self = this;

        grid = new Grid(20, 20);
        history = new History(grid);

        width = grid.size.x();
        height = grid.size.y();

        self.grid = ko.computed(function () {
            //var result = [], cell;

            //for (var i = 0; i < width; i++) {
            //    result.push([]);

            //    for (var j = 0; j < height; j++) {
            //        cell = {
            //            x: i,
            //            y: j,
            //            value: grid.get(i, j)
            //        };

            //        if (i * j % 5 === 1) {
            //            cell.value = !cell.value;
            //            result[i].push(cell);
            //        } else {
            //            result[i].push(cell);
            //        }
            //    }
            //}

            return grid.getCopy();
        });

        self.switchState = function (cell) {
            grid.switchState(cell.x, cell.y);
        }

        self.next = function () {
            history.next(rules);
        }
    };
});