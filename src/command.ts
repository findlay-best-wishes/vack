const inquirer = require("inquirer");
const { program } = require("commander");
const {task, error, guide} = require("./chalk");
const spawnOwner = require("cross-spawn");

interface OptionsType {
    name: string, 
    withReact?: boolean, 
    withTs?: boolean, 
    vue?: boolean, 
    react?: boolean
}

const options: OptionsType= {name: "my-app"};     //配置信息
commanderInit();        //初始化命令行，获取参数
//设置对话栏，进一步完善配置信息
inquirerInit().then(() => {
	const framework = options.withReact ? "react" : "vue";
	delete options.vue;
	delete options.react;
	console.log("\n", task(`We're going to create new project named ${options.name} with ${framework}${options.withTs ? " and typescript" : ""}\n`));
	require("./run")(options);
	usageGuide(options.name);
}).catch((e: Error) => {
	console.log(error("\ni am sorry about someting went wrong, please submit issue on my github repository"));
	throw e;
});

function commanderInit() {
	program.version(require("../package.json")["version"]);
	program
		.command("create [name]")
		.description("create new project")
		.action((name: string) => options.name = name);
	program
		.option("--vue", "use vue as ui framework")
		.option("--react", "use react as ui framework")
		.option("--ts", "use typescript");
	program.parse(process.argv);
	if(program.opts().ts)
		options.withTs = true;
	if(program.opts().vue && program.opts().react) {
		console.log("\n", error("do not use --vue and react at the same time"));
		process.exit(1);
	}
	if(program.opts().react)
		options.withReact = true;
	if(program.opts().vue)
		options.withReact = false;
}

function inquirerInit(){
	const questions = [];
	if(!options.name) questions.push({
		name: "name",
		default: "my-app",
		message: "what is the name of project ?"
	});

	if(typeof options.withReact !== "boolean") questions.push({
		name: "withReact",
		type: "confirm",
		message: "if you want to use react,please enter y.if you want to use vue,please enter n.",
	});
	if(!options.withTs) questions.push({
		name: "withTs",
		type: "confirm",
		message: "if you want to use typescript,please enter y. if not please enter n.",
	});

	return inquirer.prompt(questions)
		.then((answers: {withReact: boolean, withTs: boolean, name: string}) => {
			options.withReact = options.withReact || answers.withReact;
			options.name = options.name || answers.name;
			options.withTs = options.withTs || answers.withTs;
		})
		.catch((error: Error) => {
			console.error(error);
		}); 
}

//项目创建后进行用法引导
const usageGuide = (dir: string) => {
	spawnOwner.sync("clear");
	console.log("\n", task("now the project has been created successfully,you probably want to exec"));
	console.log(`\ncd ${guide(dir)}`);
	console.log(`\nthen you can exec ${guide("npm start")} or ${guide("npm run build")}`);
};

module.exports = options;

