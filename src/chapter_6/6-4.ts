// 6.4 keyoff型とlookup型

// 6.4.1 lookup型
{
	type Human = {
		type: "human";
		name: string;
		age: number;
	};

	// Humanのageの型が変更されてもsetAge側の変更は必要ない
	const setAge = (human: Human, age: Human["age"]) => {
		return {
			...human,
			age,
		};
	};
	console.log(setAge({ type: "human", name: "太郎", age: 23 }, 24)); // => { type: "human", name: "太郎", age: 24 }
}

// 6.4.2 keyof型
{
	const mmConversionTabel = {
		mm: 1,
		m: 1e3,
		km: 1e6,
	};

	const convertUnits = (
		value: number,
		unit: keyof typeof mmConversionTabel, // keyof typeof 変数名 で変数のプロパティ名のユニオン型を取得できる
	) => {
		const mmValue = value * mmConversionTabel[unit];
		return {
			mm: mmValue,
			m: mmValue / 1e3,
			km: mmValue / 1e6,
		};
	};
	console.log(convertUnits(1000, "m")); // => { mm: 1000000, m: 1000, km: 1 }
}

// 6.4.3 keyod型・lookup型とジェネリクス
{
	const get = <T, K extends keyof T>(obj: T, key: K): T[K] => {
		return obj[key];
	};

	console.log(get({ foo: "foo" }, "foo")); // => "foo"
	console.log(get({ name: "太郎", age: 23 }, "age")); // => 23
}
