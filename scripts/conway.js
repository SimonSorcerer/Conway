requirejs.config({
    paths: {
        knockout: '../lib/knockout-3.0.0',
    },
    shim: {
        knockout: {
            exports: 'jasmine'
        },
    }
});

require(["knockout", "config", "grid"], function (ko, config, Grid) {
    grid = new Grid(20, 20);

    self.width = ko.observable(grid.size.x);
    self.height = ko.observable(grid.size.y);

    self.get = function (cell) {
        return grid.get(cell.x, cell.y);
    }

    self.click = function (cell) {
        return ko.computed(function () {
            cell.switch(cell.x, cell.y);
        });
    }
});