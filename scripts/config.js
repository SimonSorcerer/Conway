define(function() {
    var defaults,
        constants;

    constants = {
        state: {
            dead: false,
            alive: true
        }
    };

    defaults = {
        grid: {
            width: 20,
            height: 20,
            state: constants.state.dead
        }
    };

    return {
        defaults: defaults,
        constants: constants
    }
});