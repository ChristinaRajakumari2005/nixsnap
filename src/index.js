#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const program = new commander_1.Command();
program
    .name("nixsnap")
    .description("A Linux system monitor CLI tool")
    .version("1.0.0");
program
    .command("hello")
    .description("Test if nixsnap is working")
    .action(() => {
    console.log("👋 Hello from nixsnap! It works!");
});
program.parse(process.argv);
//# sourceMappingURL=index.js.map