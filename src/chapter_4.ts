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

// 4.1.8
const numbers = [1, 2, 3, 4, 5];
console.log(sum(...numbers)); // これも可


// 4.1.10
// コールバック関数
// コールバック関数とは引数として渡される関数のこと
// た、コールバック関数を引数として受け取るような関数のことを高階関数と呼ぶ
type User = {
  name: string;
  age: number;
};
const getName  = (u: User): string => u.name;
const users: User[] = [
  { name: 'Taro', age: 10 },
  { name: 'Hanako', age: 20 },
  { name: 'Kenta', age: 30 },
];
const names = users.map(getName); // getName関数をコールバック関数として渡している
const names2 = users.map((u: User): string => u.name); // これでも可
console.log(names); // [ 'Taro', 'Hanako', 'Kenta' ]

// 4.2.1
// 関数型の記法
type F = (repeatNum: number, value: string) => string;
const repeat: F = (num: number): string => "x".repeat(num);

// 4.2.4
// 引数の方注釈が省略可能な場合
const repeat2: F = (num): string => "x".repeat(num); // 逆方向の推論（contextual typeing）
const arr = [1, 2, 3].filter((n) => n % 2 === 0); // このnも方注釈が必要ないのはfilterの型定義により受け取るコールバック関数の方が判明しているから


// 4.2.5
// コールシグネチャによる関数型の宣言
type MyFunc = {
  isUsed?: boolean;
  (arg: number): void;
}
const myFunc: MyFunc = (arg: number): void => {
  console.log(arg);
};
myFunc.isUsed = true;
myFunc(1); // MyFunc型はisUsedプロパティを持つオブジェクトであると同時に、numberを受け取る関数でもある