extendOptions = function (oldOptions, newOptions) {
    //var options = {
    //    language: oldOptions.language,
    //    reporter: oldOptions.reporter,
    //    actions: {
    //        quickReturn: oldOptions.actions.quickReturn,
    //        reportPass: oldOptions.actions.reportPass,
    //        reportFail: oldOptions.actions.reportFail
    //    }
    //};
    //
    //if (newOptions) {
    //    if (newOptions.hasOwnProperty('language')) options.language = newOptions.language;
    //    if (newOptions.hasOwnProperty('reporter')) options.reporter = newOptions.reporter;
    //    if (newOptions.actions) {
    //        if (newOptions.actions.hasOwnProperty('quickReturn')) options.actions.quickReturn = newOptions.actions.quickReturn;
    //        if (newOptions.actions.hasOwnProperty('reportPass')) options.actions.reportPass = newOptions.actions.reportPass;
    //        if (newOptions.actions.hasOwnProperty('reportFail')) options.actions.reportFail = newOptions.actions.reportFail;
    //    }
    //}
    var options = simpleDeepClone(oldOptions);
    simpleDeepExtend(options, newOptions);

    return options;

    function simpleDeepClone(object) {
        if (object === null || typeof object !== 'object') return object;

        var newObject = {};
        for (var i in object) {
            newObject[i] = simpleDeepClone(object[i]);
        }

        return newObject;
    }

    function simpleDeepExtend(obj1, obj2) {
        for (var i in obj2) {
            if (obj2[i] === null || typeof obj2[i] !== 'object') {
                obj1[i] = obj2[i];
            }
            else {
                if (!obj1[i]) obj1[i] = {};
                simpleDeepExtend(obj1[i], obj2[i]);
            }
        }
    }
};

falseFunc = function(){return false};