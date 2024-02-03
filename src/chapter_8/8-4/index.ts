const main = async () => {
	const { readFile, writeFile } = await import("fs/promises");
	try {
		const fooContent = await readFile("foo.txt", "utf8");
		await writeFile("bar.txt", fooContent + fooContent);
		console.log("ファイルの読み込みと書き込みが完了しました");
	} catch (error) {
		console.error("エラーが発生しました", error);
	}
};

main().then(() => {
	console.log("main関数が完了しました");
});
