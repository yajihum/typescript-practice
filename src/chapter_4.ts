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
const getName = (u: User): string => u.name;
const users: User[] = [
	{ name: "Taro", age: 10 },
	{ name: "Hanako", age: 20 },
	{ name: "Kenta", age: 30 },
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
};
const myFunc: MyFunc = (arg: number): void => {
	console.log(arg);
};
myFunc.isUsed = true;
myFunc(1); // MyFunc型はisUsedプロパティを持つオブジェクトであると同時に、numberを受け取る関数でもある

// 4.3.2
// 引数の型による部分型関係
type HasName = { name: string };
type HasNameAndAge = HasName & { age: number };

const showName = (arg: HasName) => arg.name;
const g: (obj: HasNameAndAge) => void = showName; // HasNameAndAgeはHasNameの部分型なので代入可能
console.log(g({ name: "Taro", age: 10 })); // gで定義している返り値はvoidだが、代入しているshowNameはstringを返すのも可能
// これはvoid型だけ特殊で、どんな型を返す関数型も同じ引数を受け取ってvoid型を返す関数型の部分型となるため

const f: (obj: HasName, num: number) => HasNameAndAge = (obj, num) => ({
	name: obj.name,
	age: num,
});
const g2: (obj: HasNameAndAge, num: number) => HasName = (obj, num) => ({
	name: obj.name,
});
// 上記の引数の型は反変、返り値の型は共変の関係となる

// 4.4.1
// ジェネリクスとは型引数を受け取る関数をつくる機能のこと
// ジェネリック関数は型引数を持つ関数のこと
function repeat3<T>(element: T, length: number): T[] {
	const resulet: T[] = [];
	for (let i = 0; i < length; i++) {
		resulet.push(element);
	}
	return resulet;
}
console.log(repeat3<number>(123, 3)); // [ 123, 123, 123 ]
console.log(repeat3<string>("hello", 3)); // [ 'hello', 'hello', 'hello' ]

// アロー関数の場合
const repeat4 = <T>(element: T, length: number): T[] => {
	const resulet: T[] = [];
	for (let i = 0; i < length; i++) {
		resulet.push(element);
	}
	return resulet;
};

// 部分型を使ったジェネリック型の定義
const repeat5 = <T extends { name: string }>(
	element: T,
	length: number,
): T[] => {
	const resulet: T[] = [];
	for (let i = 0; i < length; i++) {
		resulet.push(element);
	}
	return resulet;
};
console.log(repeat5<HasNameAndAge>({ name: "Taro", age: 2 }, 3)); // [ { name: 'Taro' }, { name: 'Taro' }, { name: 'Taro' } ]

// 4.6
// 力試し
const getFizzBuzzString = (num: number): string => {
	if (num % 3 === 0 && num % 5 === 0) return "FizzBuzz";
	if (num % 3 === 0) return "Fizz";
	if (num % 5 === 0) return "Buzz";
	return String(num);
};

const sequense = (start: number, end: number): number[] => {
	const result: number[] = [];
	for (let i = start; i <= end; i++) {
		result.push(i);
	}
	return result;
};
console.log(sequense(1, 100).map(getFizzBuzzString));

// 4.6.3
function map<T, S>(array: T[], callback: (arg: T) => S): S[] {
	const result: S[] = [];
	for (const item of array) {
		result.push(callback(item));
	}
	return result;
}
console.log(map([1, 2, 3], (item) => item * 2)); // [ 2, 4, 6 ]
console.log(map([3, 5, 2], (item) => item > 4)); // [ false, true, false ]
