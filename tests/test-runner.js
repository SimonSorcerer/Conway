requirejs.config({
    baseUrl: "../scripts/",
    paths: {
        tests: '../tests/',
        jasmine: '../lib/jasmine',
        mocks: '../tests/mocks',
        'jasmine-html': '../lib/jasmine-html',
        knockout: '../lib/knockout-3.0.0'
    },
    shim: {
        jasmine: {
            exports: 'jasmine'
        },
        'jasmine-html': {
            deps: ['jasmine'],
            exports: 'jasmine'
        }
    }
});

require(["jasmine-html", "tests/grid_tests"], function(jasmine) {
    var jasmineEnv = jasmine.getEnv();

    jasmineEnv.addReporter(
        new jasmine.HtmlReporter()
    );

    // Run all the loaded test specs.
    jasmineEnv.execute();
})();