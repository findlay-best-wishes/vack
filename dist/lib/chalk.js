"use strict";
var chalk = require("chalk");
var chalkFuncs = {
    keyword: function (arg) {
        return chalk.bgCyan(arg);
    },
    task: function (arg) {
        return chalk.bold.bgGreen(arg);
    },
    error: function (arg) {
        return chalk.bgRed(arg);
    },
    guide: function (arg) {
        return chalk.blue(arg);
    }
};
module.exports = chalkFuncs;
//# sourceMappingURL=chalk.js.map