Package.describe({
    name: 'zhaoyao91:schema-validation',
    version: '1.0.0',
    summary: 'define a schema, validate the world.',
    git: 'https://github.com/zhaoyao91/meteor-schema-validation',
    documentation: 'README.md'
});

Package.onUse(function (api) {
    api.versionsFrom('1.1.0.2');
    api.use('zhaoyao91:validations');
    api.use('check');

    api.addFiles('lib/utils.js');
    api.addFiles('lib/basic-language.js');
    api.addFiles('lib/basic-reporter.js');
    api.addFiles('lib/schema-validation.js');

    api.export('SchemaValidation');
});

Package.onTest(function (api) {
    api.use('tinytest');
    api.use('zhaoyao91:schema-validation');

    api.addFiles('test.js');
});