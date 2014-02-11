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

require(["knockout", "vm"], function (ko, VM) {
    ko.applyBindings(new VM());
});