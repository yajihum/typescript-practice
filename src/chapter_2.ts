import { createInterface } from 'readline';

// chapter2
console.log('chapter2');

const message: string = 'Hello World';
console.log(message + ' from index.tsa');

// BigInt(任意精度整数)
const bignum: bigint = (123n + 456n) * 2n;
console.log(bignum);

// テンプレートリテラル
const template_literal: string = `Hellow
World`;
console.log(template_literal);

// エスケープシーケンス
//「Hello 祭 world!」
console.log('Hello \u{796d} world!');

// 等価演算子の一致判定
// == は型変換を行うため、型が異なっていても一致する場合がある
const x: any = '10';
console.log(x == 10);
// 以下2つは同じ判定
console.log(x == null);
console.log(x === null || x === undefined);

// || と ?? の違い
// || は左側がfalseなら右側を返す(空文字列、0、false、null、undefinedなど)
// ?? は左側がnullまたはundefinedなら右側を返す（null、undefinedのみ）
const foo = '' || 1;
console.log(foo); // 1
const bar = '' ?? 1;
console.log(bar); // ''

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('数値を入力してください:', (line) => {
  const num = Number(line);
  console.log(num + 1000);
  rl.close();
});
