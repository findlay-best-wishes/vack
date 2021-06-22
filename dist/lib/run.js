"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var spawn = require('cross-spawn');
var spawnSync = spawn.sync;
var fs = require('fs');
var path = require('path');
module.exports = function (_a) {
    var name = _a.name, withReact = _a.withReact, withTs = _a.withTs;
    var projectDir = path.join(process.cwd(), name);
    var cliDir = path.join(__dirname, "../../");
    npmModuleInit();
    generateFiles();
    installDeps();
    function npmModuleInit() {
        fs.existsSync(projectDir) ? (console.log("project existed")) : (fs.mkdirSync(projectDir));
        process.chdir(name);
        spawnSync('npm', ['init', '-y']);
    }
    function installDeps() {
        var commonDevDeps = ["webpack", "webpack-cli", "webpack-dev-server", "webpack-merge",
            "html-webpack-plugin", "css-loader", "style-loader",
            "babel-loader", "@babel/core", "@babel/preset-env"
        ];
        var devDepsForReact = ["@babel/preset-react"];
        var devDepsForVue = ["vue-loader@next", "@vue/compiler-sfc"];
        var depsForReact = ["react", "react-dom", "react-router", "react-router-dom", "react-document-title"];
        var depsForVue = ["vue@next", "@vue/runtime-core"];
        process.chdir(projectDir);
        //安装开发依赖
        spawnSync("npm", __spreadArray(['install', '-D'], commonDevDeps).concat(withReact ? devDepsForReact : devDepsForVue)
            .concat(withTs ? "@babel/preset-typescript" : []), {
            stdio: 'inherit'
        });
        //安装生产依赖
        spawnSync("npm", ['install'].concat(withReact ? depsForReact : depsForVue), {
            stdio: "inherit"
        });
    }
    function generateFiles() {
        var _a;
        dirsInit();
        //脚手架中文件地址到项目文件地址的映射
        var srcToProjMapped = (_a = {
                "config/webpack.dev.js": "build/webpack.dev.js",
                "config/webpack.prod.js": "build/webpack.prod.js"
            },
            _a["config/" + (withReact ? "react" : "vue") + ".common.js"] = "build/webpack.common.js",
            _a["srcTemplate/index.html"] = "public/index.html",
            _a);
        if (withReact) {
            var srcDirInCli = "srcTemplate/react";
            srcToProjMapped[srcDirInCli + "/index.css"] = "src/index.css";
            srcToProjMapped[srcDirInCli + "/index.jsx"] = "src/index." + (withTs ? "t" : "j") + "sx";
            srcToProjMapped[srcDirInCli + "/App.jsx"] = "src/App." + (withTs ? "t" : "j") + "sx";
            srcToProjMapped[srcDirInCli + "/components/greeting.jsx"] = "src/components/greeting." + (withTs ? "t" : "j") + "sx";
            srcToProjMapped[srcDirInCli + "/components/index.css"] = "src/components/index.css";
        }
        else {
            var srcDirInCli = "srcTemplate/vue";
            srcToProjMapped[srcDirInCli + "/index.js"] = "src/index." + (withTs ? "t" : "j") + "s";
            srcToProjMapped[srcDirInCli + "/App.vue"] = "src/App.vue";
            srcToProjMapped[srcDirInCli + "/components/greeting.vue"] = "src/components/greeting.vue";
        }
        //将脚手架中文件赋值到所创建项目中
        for (var _i = 0, _b = Object.entries(srcToProjMapped); _i < _b.length; _i++) {
            var _c = _b[_i], src = _c[0], dest = _c[1];
            fs.copyFileSync(path.join(cliDir, src), path.join(projectDir, dest));
        }
        pkgJsonInit();
        //创建目录结构
        function dirsInit() {
            process.chdir(projectDir);
            fs.mkdirSync("build");
            fs.mkdirSync("public");
            fs.mkdirSync("src");
            process.chdir("src");
            fs.mkdirSync("components");
            process.chdir(projectDir);
        }
        //修改package.json
        function pkgJsonInit() {
            process.chdir(projectDir);
            var pkgJson = require(path.join(projectDir, "./package.json"));
            pkgJson["main"] = "./src/index." + (withTs ? (withReact ? "tsx" : "ts") : (withReact ? "jsx" : "js"));
            pkgJson["scripts"]["start"] = "webpack server --open --config ./build/webpack.dev.js";
            pkgJson["scripts"]["build"] = "webpack --config ./build/webpack.prod.js";
            fs.writeFileSync("package.json", JSON.stringify(pkgJson, null, 4));
        }
    }
};
//# sourceMappingURL=run.js.map