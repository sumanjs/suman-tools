#!/usr/bin/env node
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var cp = require("child_process");
var dashdash = require('dashdash');
var findProjectRoot = require('residence').findProjectRoot;
var chalk = require("chalk");
var options = [
    {
        names: ['help', 'h'],
        type: 'bool',
        help: 'Print this help and exit.'
    },
    {
        names: ['extract-json-array'],
        type: 'string',
        help: 'Use this option to send each item of a JSON array to stdout.'
    },
    {
        names: ['is-symlinked-globally'],
        type: 'string',
        help: 'Use this option to send each item of a JSON array to stdout.'
    },
    {
        names: ['to-json'],
        type: 'string',
        help: 'Use this option to write a JSON string to stdout from x, given --to-json="x".'
    },
    {
        names: ['is-symlinked-locally'],
        type: 'string',
        help: 'Use this option to send each item of a JSON array to stdout.'
    },
];
var opts, parser = dashdash.createParser({ options: options });
try {
    opts = parser.parse(process.argv);
}
catch (e) {
    console.error(chalk.red(' => suman-tools usage error: %s'), e.message);
    process.exit(1);
}
if (opts.help) {
    var help = parser.help({ includeEnv: true }).trimRight();
    console.log('usage: node foo.js [OPTIONS]\n'
        + 'options:\n'
        + help);
    process.exit(0);
}
if (opts.extract_json_array) {
    var arr = JSON.parse(opts.extract_json_array);
    arr.forEach(function (a) {
        console.log(a);
    });
    process.exit(0);
}
if (opts.to_json) {
    console.log(opts.to_json);
    process.exit(0);
}
var root = findProjectRoot(process.cwd());
if (opts.is_symlinked_locally) {
    try {
        var p = path.resolve(root + '/node_modules/' + String(opts.is_symlinked_locally).trim());
        var stats = fs.lstatSync(p);
        var v = stats.isSymbolicLink() ? 'affirmative' : 'negative';
        console.log(v);
        process.exit(0);
    }
    catch (err) {
        if (/no such file or directory/.exec(err.message)) {
            console.log('negative');
            process.exit(0);
        }
        console.error('\n', err.stack, '\n');
        process.exit(1);
    }
}
if (opts.is_symlinked_globally) {
    try {
        var npmRoot = String(cp.execSync('npm root -g', { encoding: 'utf8' })).trim();
        var p = path.resolve(npmRoot + '/' + String(opts.is_symlinked_globally).trim());
        var stats = fs.lstatSync(p);
        var v = stats.isSymbolicLink() ? 'affirmative' : 'negative';
        console.log(v);
        process.exit(0);
    }
    catch (err) {
        if (/no such file or directory/.exec(err.message)) {
            console.log('negative');
            process.exit(0);
        }
        console.error('\n', err.stack, '\n');
        process.exit(1);
    }
}
