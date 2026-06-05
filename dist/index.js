#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const systeminformation_1 = __importDefault(require("systeminformation"));
const program = new commander_1.Command();
program
    .name("nixsnap")
    .description("A Linux system monitor CLI tool")
    .version("1.0.0");
// Main command - shows everything
program
    .command("snap")
    .description("Show full system snapshot")
    .action(async () => {
    console.log("\n📸 nixsnap — System Snapshot\n");
    console.log("================================");
    // CPU
    const cpu = await systeminformation_1.default.cpu();
    const cpuLoad = await systeminformation_1.default.currentLoad();
    console.log(`\n🖥️  CPU`);
    console.log(`   Model : ${cpu.manufacturer} ${cpu.brand}`);
    console.log(`   Cores : ${cpu.cores}`);
    console.log(`   Load  : ${cpuLoad.currentLoad.toFixed(1)}%`);
    // RAM
    const mem = await systeminformation_1.default.mem();
    const usedRam = ((mem.used / mem.total) * 100).toFixed(1);
    const totalGB = (mem.total / 1024 / 1024 / 1024).toFixed(1);
    const usedGB = (mem.used / 1024 / 1024 / 1024).toFixed(1);
    console.log(`\n🧠  RAM`);
    console.log(`   Total : ${totalGB} GB`);
    console.log(`   Used  : ${usedGB} GB (${usedRam}%)`);
    // Disk
    const disk = await systeminformation_1.default.fsSize();
    console.log(`\n💾  Disk`);
    disk.forEach((d) => {
        const total = (d.size / 1024 / 1024 / 1024).toFixed(1);
        const used = (d.used / 1024 / 1024 / 1024).toFixed(1);
        const percent = ((d.used / d.size) * 100).toFixed(1);
        console.log(`   ${d.mount} : ${used}GB / ${total}GB (${percent}%)`);
    });
    // OS
    const os = await systeminformation_1.default.osInfo();
    console.log(`\n🐧  OS`);
    console.log(`   Platform : ${os.platform}`);
    console.log(`   Distro   : ${os.distro}`);
    console.log(`   Arch     : ${os.arch}`);
    console.log("\n================================\n");
});
// Processes command
program
    .command("processes")
    .description("Show top 10 running processes")
    .action(async () => {
    console.log("\n⚙️  nixsnap — Top Processes\n");
    console.log("================================");
    const procs = await systeminformation_1.default.processes();
    const top10 = procs.list
        .sort((a, b) => b.cpu - a.cpu)
        .slice(0, 10);
    top10.forEach((p, i) => {
        console.log(`${i + 1}. ${p.name.padEnd(25)} CPU: ${p.cpu.toFixed(1)}%   MEM: ${p.mem.toFixed(1)}%`);
    });
    console.log("\n================================\n");
});
// Watch command - live updates
program
    .command("watch")
    .description("Live system monitor, updates every 2 seconds")
    .action(async () => {
    console.clear();
    console.log("👁️  nixsnap watch mode — Press Ctrl+C to exit\n");
    const update = async () => {
        console.clear();
        console.log("👁️  nixsnap — Live Monitor (Ctrl+C to exit)\n");
        console.log("================================");
        const cpuLoad = await systeminformation_1.default.currentLoad();
        const mem = await systeminformation_1.default.mem();
        const usedRam = ((mem.used / mem.total) * 100).toFixed(1);
        const usedGB = (mem.used / 1024 / 1024 / 1024).toFixed(1);
        const totalGB = (mem.total / 1024 / 1024 / 1024).toFixed(1);
        console.log(`\n🖥️  CPU Load : ${cpuLoad.currentLoad.toFixed(1)}%`);
        console.log(`🧠  RAM      : ${usedGB}GB / ${totalGB}GB (${usedRam}%)`);
        const disk = await systeminformation_1.default.fsSize();
        disk.forEach((d) => {
            const total = (d.size / 1024 / 1024 / 1024).toFixed(1);
            const used = (d.used / 1024 / 1024 / 1024).toFixed(1);
            const percent = ((d.used / d.size) * 100).toFixed(1);
            console.log(`💾  Disk     : ${used}GB / ${total}GB (${percent}%)`);
        });
        console.log("\n================================");
        console.log(`⏱️  Updated at: ${new Date().toLocaleTimeString()}`);
    };
    await update();
    const timer = setInterval(update, 2000);
    process.on("SIGINT", () => {
        clearInterval(timer);
        console.log("\n\n👋 nixsnap watch stopped. Bye!\n");
        process.exit(0);
    });
});
program.parse(process.argv);
