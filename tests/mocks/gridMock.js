define([], function () {
    'use strict';

    var val = 1;

    function get(x, y) {
        return val;
    }

    function liveNeighbors(x, y) {
        return 1;
    }

    function getCopy() {
        return [[0, 0], [0, 1]];
    }

    return {
        get: get,
        liveNeighbors: liveNeighbors,
        getCopy: getCopy,
        size: {
            x: 2,
            y: 2
        }
    };
});