// 6.7 さらに高度な型

// 6.7.1 object型・never型
{
	// toStringというメソッドを持つオブジェクト型
	type HasToString = {
		toString(): string;
	};
	const useToString = (value: HasToString) => {
		console.log(value.toString());
	};

	// プリミティブも受け入れる
	// なぜなら、toStringというメソッドをデフォルトで持っているから
	console.log(useToString(123)); // => 123

	// 以下のようにするとオブジェクト限定にできる
	const useToString2 = (value: HasToString & object) => {
		console.log(value.toString());
	};
	// console.log(useToString2(123)); // => エラー
}

// 6.7.2 型述語（ユーザー定義型ガード）
{
	// ユーザー定義型ガードはasやanyのように型安全性を破壊するものだが、他よりも一番積極的に選ぶもの

	const isStringOrNumber = (value: unknown): value is string | number => {
		return typeof value === "string" || typeof value === "number";
	};

	const value: unknown = 123;

	// isStringOrNumberで型を絞り込む（ただのbooleanを返していたら型の絞り込みは行われない）
	if (isStringOrNumber(value)) {
		console.log(value.toString());
	}

	// assertsの場合は関数の戻り値がvoidで、最後まで例外が発生せずに終了した場合に型の絞り込みが行われる
	const isStringOrNumber2 = (
		value: unknown,
	): asserts value is string | number => {
		if (typeof value !== "string" && typeof value !== "number") {
			throw new Error("value is not string or number");
		}
	};
}

// 6.7.3 可変長タプル型
{
	type NumberAndStrings = [number, ...string[]];

	const arr1: NumberAndStrings = [123, "abc", "rorisu", "peetan"];
	const arr2: NumberAndStrings = [456];

	type NumberStringNumber = [number, ...string[], number];
	const arr3: NumberStringNumber = [123, "abc", "rorisu", "peetan", 456];
	const arr4: NumberStringNumber = [456, 456];

	type NSOrNN = [...NumberAndStrings, ...NumberStringNumber]; // [number, ...(string | number)[], number]
}

// 6.7.4 mapped types
{
	type Fruit = "apple" | "banana" | "orange";

	// 「Fruitの各構成要素Pに対してPというプロパティが型numberを持つようなオブジェクト型」
	type FruitNumbers = {
		[P in Fruit]: number;
	};
	const numbers: FruitNumbers = {
		apple: 5,
		banana: 10,
		orange: 3,
	};

	type FruitArrays = {
		[P in Fruit]: P[];
	};
	const arrays: FruitArrays = {
		apple: ["apple", "apple"],
		banana: ["banana"],
		orange: ["orange", "orange", "orange"],
	};
}

// 6.7.5 conditional types
{
	// 型の条件分岐を行う
	type RestArgs<M> = M extends "string"
		? [string, string]
		: [number, number, number];

	const func = <M extends "string" | "number">(
		mode: M,
		...args: RestArgs<M>
	) => {
		console.log(mode, ...args);
	};

	console.log(func("string", "abc", "def")); // => string abc def
	console.log(func("number", 1, 2, 3)); // => number 1 2 3
}

// 6.7.6 組み込みの型
{
	// 全てをread onlyにする
	type T = Readonly<{ name: string; age: number }>; // { readonly name: string; readonly age: number; }

	// 全てをoptionalにする
	type T2 = Partial<{ name: string; age: number }>; // { name?: string; age?: number; }

	// 全てを必須にする
	type T3 = Required<{ name?: string; age?: number }>; // { name: string; age: number; }

	// Pick
	type T4 = Pick<{ name: string; age: number }, "name">; // { name: string; }

	// Omit
	type T5 = Omit<{ name: string; age: number }, "name">; // { age: number; }

	// Extract
	// Extract<T,U>でT(普通はユニオン型)の構成要素のうちUの部分型であるもののみを抜き出すもの
	type T6 = Extract<"a" | "b" | 123, string>; // "a" | "b"

	// Exclude
	// Exclude<T,U>でT(普通はユニオン型)の構成要素のうちUの部分型でないもののみを抜き出すもの
	type T7 = Exclude<"a" | "b" | 123, string>; // 123
}
