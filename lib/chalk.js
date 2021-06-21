const  chalk = require("chalk");

module.exports = {
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