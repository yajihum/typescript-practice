// chapter 4
// Typescriptの関数

// 4.1.6
// メソッド記法で関数を定義する
const obj = {
  double(num: number): number {
    return num * 2;
  },
  double2: (num: number): number => num * 2,
};
console.log(obj.double(123));
console.log(obj.double2(123));

// 4.1.7
// 可変長引数の宣言
// 可変超引数とは任意の数の引数を受け取れる関数のこと
// Typescriptではrest引数構文を使う
// 型は必ず配列型である必要がある
const sum = (...args: number[]): number => {
  return args.reduce((result, num) => result + num, 0);
};
console.log(sum(1, 2, 3, 4, 5)); // 15
