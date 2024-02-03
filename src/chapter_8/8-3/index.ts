import { readFile } from "fs/promises";

const p = readFile("rorisu.txt", "utf8");

p.then((result) => {
	console.log(result);
});
p.catch((error) => {
	console.error(error);
});

const p2 = new Promise<number>((resolve) => {
	// executor関数
	setTimeout(() => {
		resolve(100);
	}, 3000);
});
p2.then((result) => {
	console.log(result);
});

const p3 = Promise.resolve(200);
p3.then((result) => {
	console.log(result);
});
const p4 = Promise.reject(new Error("エラーです"));
p4.catch((error) => {
	console.error(error);
});

const pAll = Promise.all([
	readFile("foo.txt", "utf8"),
	readFile("bar.txt", "utf8"),
	readFile("baz.txt", "utf8"),
]);
pAll.then(([foo, bar, baz]) => {
	console.log(foo, bar, baz);
});

const sleepReject = (duration: number) => {
	return new Promise((_, reject) => {
		setTimeout(reject, duration);
	});
};
// 5秒後にタイムアウトする
// それまでに非同期処理が成功すればタイムアウトは発生しないs
const p5 = Promise.race([readFile("foo.txt", "utf8"), sleepReject(5000)]);
p5.then((result) => {
	console.log(result);
}).catch((error) => {
	console.error(error);
});

// Prmise.settled
// Promiseが成功しても失敗しても全ての結果を見届けたい時に使用する
const pAllSettled = Promise.allSettled([
	readFile("foo.txt", "utf8"),
	sleepReject(5000),
]);
pAllSettled.then((result) => {
	console.log(result); // => [{status: 'fulfilled', value: 'foo.txtの中身'}, {status: 'rejected', reason: [Error: エラーです]}]
});

// Primise.any
// 成功したもののうち一番早いものを返す
// 失敗しても全ての結果を見届けたい時に使用する
const pAny = Promise.any([readFile("foo.txt", "utf8"), sleepReject(5000)]);

// thenの中でPromiseそれを受け取ったPromiseの解決も遅れる
const p6 = readFile("foo.txt", "utf8");
const p8 = p6.then((result) => {
	const p7 = readFile("bar.txt", "utf8");
	return p7;
});
p8.then((result) => {
	console.log(result);
});

// dynamic import
// importする側のモジュール呼び出しがある時に初めてモジュールを読み込む
// つまり、モジュールが必要になるまで呼び出しが行われない
import("fs/promises").then(({ readFile }) => {
	readFile("foo.txt", "utf8").then((result) => {
		console.log(result);
	});
});
