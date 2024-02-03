import path from "path";
import { fileURLToPath } from "url";

const filePath = fileURLToPath(import.meta.url);
const fileDir = path.dirname(filePath);
const dataDir = path.join(fileDir, ".../rorisu.txt");

const main = async () => {
	const { readFile, writeFile } = await import("fs/promises");
	try {
		const content = await readFile(dataDir, "utf8");

		console.log(getCount(content));
	} catch (error) {
		console.error("エラーが発生しました", error);
	}
};
main().then(() => {
	console.log("main関数が完了しました");
});

const getCount = (content: string) => {
	let count = 0;
	let currentIndex = 0;
	while (true) {
		const nextIndex = content.indexOf("りす", currentIndex);
		if (nextIndex === -1) {
			break;
		}
		count++;
		currentIndex = nextIndex + 1;
	}
	return count;
};
