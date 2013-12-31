define(["config"], function(config) {
    var rules;

    rules.underPopulation = function(state, liveNeighbors) {
        if (liveNeighbors < 2) {
            return config.constants.state.dead;
        }
        return state;
    };

    rules.overCrowding = function(state, liveNeighbors) {
        if (liveNeighbors > 3) {
            return config.constants.state.dead;
        }
        return state;
    };

    rules.reproduction = function(state, liveNeighbors) {
        if (liveNeighbors == 3) {
            return config.constants.state.alive;
        }
        return state;
    };

    return [
        rules.underPopulation,
        rules.overCrowding,
        rules.reproduction
    ];
});