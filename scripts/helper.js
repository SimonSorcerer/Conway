define(function () {
    var self = this;

    self.simpleObjectToArray = function (obj) {
        var key, arr = [];

        for (key in obj) {
            arr.push(obj[key]);
        };

        return arr;
    };

    return {
        simpleObjectToArray: simpleObjectToArray
    };
});