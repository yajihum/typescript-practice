import { readFile } from "fs";

const startTime = performance.now();
readFile("rorisu.txt", (error, contents) => {
	const endTime = performance.now();
	console.log(`${endTime - startTime}ミリ秒かかりました`);
});
