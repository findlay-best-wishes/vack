const  chalk = require("chalk");

type chalkFuncsType = {
    [index: string]: (arg: string) => string
}

const chalkFuncs: chalkFuncsType = {
    keyword(arg){
        return chalk.bgCyan(arg);
    },
    task(arg){
        return chalk.bold.bgGreen(arg);
    },
    error(arg){
        return chalk.bgRed(arg);
    },
    guide(arg){
        return chalk.blue(arg);
    }
}
module.exports = chalkFuncs;