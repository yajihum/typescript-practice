import * as fs from "fs";

const data = fs.readFileSync("rorisu.txt", "utf-8");

console.log(data);
