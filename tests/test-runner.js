requirejs.config({
    baseUrl: "../scripts/",
    paths: {
        tests: '../tests/',
        jasmine: '../lib/jasmine',
        'jasmine-html': '../lib/jasmine-html'
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

require(["jasmine-html", "tests/grid_tests", "tests/history_tests"], function(jasmine) {
    var jasmineEnv = jasmine.getEnv();

    jasmineEnv.addReporter(
        new jasmine.HtmlReporter()
    );

    // Run all the loaded test specs.
    jasmineEnv.execute();
})();