// 6.3 型の絞り込み
// TypeScriptでは型の絞り込みのことを「コントロールフロー解析」とも呼ぶ

// 6.3.2 typeofによる絞り込み
{
	// typeofはJavaScriptのtypeofと同じように使える
	const formatNumberOrString = (value: number | string) => {
		if (typeof value === "number") {
			return value.toFixed(2);
		}
		return value;
	};
	console.log(formatNumberOrString(0.1)); // => "0.10"
	console.log(formatNumberOrString("TypeScript")); // => "TypeScript"
}

// 6.3.3 代数的データ型をユニオン型で再現するテクニック
{
	type Animal = {
		tag: "animal"; // tagよりはtypeの方がいいかも
		species: string;
	};
	type Human = {
		tag: "human";
		name: string;
	};
	type User = Animal | Human;

	const getUserName = (user: User) => {
		// 判別用の情報（タグ）を持つのが代数的データ型の特徴
		if (user.tag === "human") {
			return user.name;
		}
		return "名無し";
	};
	console.log(getUserName({ tag: "human", name: "太郎" } as User)); // => "太郎"
	console.log(getUserName({ tag: "animal", species: "cat" } as User)); // => "名無し"
}
