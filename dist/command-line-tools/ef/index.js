#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var index_1 = require("./logger/index");
var index_2 = require("./shell/index");
var workspace_1 = require("./workspace/workspace");
var project_factory_1 = require("./project/factory/project-factory");
var index_3 = require("./interpolator/index");
var commander = tslib_1.__importStar(require("commander"));
var interpolator = new index_3.Interpolator();
var program = new commander.Command();
var logger = new index_1.Logger();
logger.setLevel(index_1.LOGGER_LEVEL.VERBOSE);
var shell = new index_2.Shell(logger);
var projectFactory = new project_factory_1.ProjectFactory(interpolator, logger);
var githubToken = process.env.GITHUB_TOKEN || 'YOU_NEED_TO_SET_A_GITHUB_TOKEN';
var ws = new workspace_1.Workspace(githubToken, projectFactory, shell, logger, interpolator);
ws.initialise();
function runCommand(command) {
    var init = new Date();
    command.subscribe({
        complete: function () {
            var final = new Date();
            var result = (final.getTime() - init.getTime()) / 1000;
            logger.log("\n\n Finished in " + result + "\n\n");
        }
    });
}
program
    .command('build <project>')
    .action(function (project) { return runCommand(ws.build(project)); });
program
    .command('test <project>')
    .action(function (project) { return runCommand(ws.test(project)); });
program
    .command('lint <project>')
    .action(function (project) { return runCommand(ws.lint(project)); });
// program
//     .command('release <project>')
//     .action( project => runCommand( ws.release(project) ));
program
    .command('create-deployment <project>')
    .action(function (project) { return runCommand(ws.createDeployment(project)); });
program
    .command('deploy')
    .action(function (project) { return runCommand(ws.deploy()); });
program
    .command('bump')
    .action(function () {
    runCommand(ws.bump());
});
program
    .command('build-structure <project>')
    .action(function (project) { return ws.buildStructure(project); });
program
    .command('list')
    .action(function () {
    console.log("" + ws.projects.map(function (p) { return p.group + " " + p.id; }).join('\n'));
});
program
    .command('release')
    .action(function () {
    var GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    var CLI = process.env.CLI;
    if (!CLI) {
        console.log('You need to set the ENV var CLI to run this command');
        process.exit(1);
    }
    if (!GITHUB_TOKEN) {
        console.log('You need to set the ENV var GITHUB_TOKEN with a token to run this command');
        process.exit(1);
    }
    runCommand(ws.release());
});
program
    .command('release')
    .action(function (project) { return runCommand(ws.release()); });
program.parse(process.argv);
//# sourceMappingURL=index.js.map