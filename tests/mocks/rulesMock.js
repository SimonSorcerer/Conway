define(["config"], function (config) {
    var rules = {};

    rules.oneFn = function (state, liveNeighbors) {
        return !state;
    };

    return [rules.oneFn];
});