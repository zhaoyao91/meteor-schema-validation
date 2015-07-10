// SchemaValidation as a class
/**
 * @param schema(s)
 * @param [options]
 * @param [options.language]
 * @param [options.reporter]
 * @param [options.actions]
 *
 * @constructor
 */
SchemaValidation = function (schema, options) {
    options = extendOptions(SchemaValidation.defaultOptions, options);
    this.language = options.language;
    this.reporter = options.reporter;
    this.actions = options.actions;

    if (schema) {
        var simpleSchema = this.language.parse(schema);
        this.validation = Validations.parse(simpleSchema);
    }
    // if no schema, then it may be init by batchNew
};

SchemaValidation.batchNew = function (schemas, options) {
    options = extendOptions(SchemaValidation.defaultOptions, options);
    var i;

    var simpleSchemas = {};
    for (i in schemas) {
        simpleSchemas[i] = options.language.parse(schemas[i]);
    }

    var validations = Validations.batchParse(simpleSchemas);

    var schemaValidations = {};
    for (i in validations) {
        schemaValidations[i] = new SchemaValidation(null, options);
        schemaValidations[i].validation = validations[i];
    }

    return schemaValidations;
};

SchemaValidation.prototype = {
    test: function (target) {
        return this.validation.test(target);
    },

    validate: function (target) {
        var report = this.validation.validate(target, this.actions);
        report = this.reporter.makeReport(report);
        return report;
    },

    check: function (target) {
        var report = this.validation.validate(target, this.actions);
        if (report.result === false) {
            // throw error
            report = this.reporter.makeReport(report);
            try {
                check(null, Match.Where(falseFunc));
            }
            catch (error) {
                if (error.errorType === 'Match.Error') {
                    error.sanitizedError.details = report;
                }
                throw error;
            }
        }
    }
};


// SchemaValidation as options manager
SchemaValidation.setDefaultOptions = function (options) {
    SchemaValidation.defaultOptions = extendOptions(SchemaValidation.defaultOptions, options);
    updateValidationList();
};

SchemaValidation.defaultOptions = {
    language: basicLanguage,
    reporter: basicReporter,
    actions: {
        quickReturn: true,
        reportPass: false,
        reportFail: true
    }
};


// SchemaValidation as a proxy of Validations
SchemaValidation.addValidation = function (validationClass) {
    Validations.add(validationClass);
    updateValidationList();
};

SchemaValidation.addValidationByPrototype = function (prototype) {
    Validations.addByPrototype(prototype);
    updateValidationList();
};

SchemaValidation.addValidationByTestFunc = function (name, testFunc) {
    Validations.addByTestFunc(name, testFunc);
    updateValidationList();
};

SchemaValidation.stringValidations = {
    enable: function (nameFunc) {
        Validations.stringValidations.enable(nameFunc);
        updateValidationList();
    },

    disable: function () {
        Validations.stringValidations.disable();
        updateValidationList();
    }
};


// utils
function updateValidationList() {
    SchemaValidation.defaultOptions.language.updateValidationList(Validations.getList());
}