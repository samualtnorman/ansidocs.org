#!/usr/bin/env node
import { spawn } from "child_process"

await Promise.all([
	new Promise(resolve => spawn("pnpm", [ "build" ], { stdio: "inherit" }).once("exit", resolve)),
	new Promise(resolve => spawn("./pnpm.dockerfile", { stdio: "inherit" }).once("exit", resolve))
])

spawn("./Dockerfile", { stdio: "inherit" })
