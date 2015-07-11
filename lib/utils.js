extendOptions = function (oldOptions, newOptions) {
    // clone old options
    var options = {
        language: oldOptions.language,
        reporter: oldOptions.reporter,
        actions: {
            quickReturn: oldOptions.actions.quickReturn,
            reportPass: oldOptions.actions.reportPass,
            reportFail: oldOptions.actions.reportFail
        }
    };

    // extend new options to the clone
    if (newOptions) {
        if (newOptions.hasOwnProperty('language')) options.language = newOptions.language;
        if (newOptions.hasOwnProperty('reporter')) options.reporter = newOptions.reporter;
        if (newOptions.actions) {
            if (newOptions.actions.hasOwnProperty('quickReturn')) options.actions.quickReturn = newOptions.actions.quickReturn;
            if (newOptions.actions.hasOwnProperty('reportPass')) options.actions.reportPass = newOptions.actions.reportPass;
            if (newOptions.actions.hasOwnProperty('reportFail')) options.actions.reportFail = newOptions.actions.reportFail;
        }
    }

    return options;
};

falseFunc = function(){return false};