var emsg = 'Match error: Failed Match.Where validation';

Tinytest.add('new', function (test) {
    var schema = {
        name: 'or',
        schemas: [
            {name: 'isString'},
            {name: 'isNumber'}
        ]
    };

    var sv = new SchemaValidation(schema);

    test.equal(sv.test(1), true);
    test.equal(sv.test({}), false);

    test.equal(sv.validate('s'), {
        result: true,
        name: 'or',
        reports: []

    });
    test.equal(sv.validate(1), {
        result: true,
        name: 'or',
        reports: [
            {result: false, name: 'isString'}
        ]

    });
    test.equal(sv.validate({}), {
        result: false,
        name: 'or',
        reports: [
            {result: false, name: 'isString'},
            {result: false, name: 'isNumber'}
        ]
    });

    test.isUndefined(sv.check(1));
    test.throws(sv.check.bind(sv, {}), emsg);
});

Tinytest.add('string validations', function (test) {
    SchemaValidation.stringValidations.enable(function (name) {
        return '.' + name;
    });

    var schema = {
        name: '.isEmail'
    };

    var sv = new SchemaValidation(schema);

    test.equal(sv.test('qq@qq.com'), true);
    test.equal(sv.test('qq.com'), false);

    test.equal(sv.validate('qq@qq.com'), {
        result: true,
        name: '.isEmail'
    });
    test.equal(sv.validate('qq.com'), {
        result: false,
        name: '.isEmail'
    });

    test.isUndefined(sv.check('qq@qq.com'));
    test.throws(sv.check.bind(sv, 'qq.com'), emsg);
});

Tinytest.add('add validations', function (test) {
    SchemaValidation.addValidationByTestFunc('wow', function(target){return target === 'wow'});

    var schema = {
        name: 'wow'
    };

    var sv = new SchemaValidation(schema);

    test.equal(sv.test('wow'), true);
    test.equal(sv.test('mom'), false);

    test.equal(sv.validate('wow'), {
        result: true,
        name: 'wow'
    });
    test.equal(sv.validate('mom'), {
        result: false,
        name: 'wow'
    });

    test.isUndefined(sv.check('wow'));
    test.throws(sv.check.bind(sv, 'mom'), emsg);
});

var testLanguage = {
    parse: function (schema) {
        schema.name = schema['test-name'];
        delete schema['test-name'];
        return schema;
    },

    updateValidationList: function (list) {
    }
};

var testReporter = {
    makeReport: function (report) {
        report['test-name'] = report.name;
        delete report.name;
        return report;
    }
};

var testOptions = {
    language: testLanguage,
    reporter: testReporter,
    actions: {
        quickReturn: false,
        reportPass: true,
        reportFail: true
    }
};

Tinytest.add('set options', function (test) {
    var schema = {
        'test-name': 'or',
        schemas: [
            {name: 'isString'},
            {name: 'isNumber'}
        ]
    };

    var sv = new SchemaValidation(schema, testOptions);

    test.equal(sv.test(1), true);
    test.equal(sv.test({}), false);

    test.equal(sv.validate('s'), {
        result: true,
        'test-name': 'or',
        reports: [
            {result: true, name: 'isString'},
            {result: false, name: 'isNumber'},
        ]
    });
    test.equal(sv.validate(1), {
        result: true,
        'test-name': 'or',
        reports: [
            {result: false, name: 'isString'},
            {result: true, name: 'isNumber'},
        ]
    });
    test.equal(sv.validate({}), {
        result: false,
        'test-name': 'or',
        reports: [
            {result: false, name: 'isString'},
            {result: false, name: 'isNumber'},
        ]
    });

    test.isUndefined(sv.check(1));
    test.throws(sv.check.bind(sv, {}), emsg);
});

Tinytest.add('set default options', function (test) {
    var defaultOptions = SchemaValidation.defaultOptions;
    SchemaValidation.setDefaultOptions(testOptions);

    var schema = {
        'test-name': 'or',
        schemas: [
            {name: 'isString'},
            {name: 'isNumber'}
        ]
    };

    var sv = new SchemaValidation(schema);

    test.equal(sv.test(1), true);
    test.equal(sv.test({}), false);

    test.equal(sv.validate('s'), {
        result: true,
        'test-name': 'or',
        reports: [
            {result: true, name: 'isString'},
            {result: false, name: 'isNumber'},
        ]
    });
    test.equal(sv.validate(1), {
        result: true,
        'test-name': 'or',
        reports: [
            {result: false, name: 'isString'},
            {result: true, name: 'isNumber'},
        ]
    });
    test.equal(sv.validate({}), {
        result: false,
        'test-name': 'or',
        reports: [
            {result: false, name: 'isString'},
            {result: false, name: 'isNumber'},
        ]
    });

    test.isUndefined(sv.check(1));
    test.throws(sv.check.bind(sv, {}), emsg);

    SchemaValidation.setDefaultOptions(defaultOptions);
});
