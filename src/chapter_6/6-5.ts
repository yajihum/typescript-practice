// 6.5 asによる型アサーション
// 型アサーションの使用はできるだけ避けるべき

// 6.5.1 型アサーションを用いいて式の型を誤魔化す
{
	type Animal = {
		type: "animal";
		species: string;
	};
	type Human = {
		type: "human";
		name: string;
	};
	type User = Animal | Human;

	const getNamesIfAllHuman = (users: readonly User[]): string[] | undefined => {
		// readonlyをつけているのはHuman型と判別した後にusersを変更できないようにするため
		if (users.every((user) => user.type === "human")) {
			//return users.map((user) => user.name); // ここでエラーになる
			return (users as Human[]).map((user) => user.name); // 型アサーションを使ってエラーを回避
		}
		return [];

		// このように型アサーションを使う方法もあるが、ユーザー定義型ガードを使う方がいいとも言われている
	};
}

// 6.5.2 as constの用法
{
	// 1. 配列リテラルの型推論結果を配列型ではなくタプル型する
	const foo = [123, "abc"] as const;

	// 2. オブジェクトリテラル方推論されるオブジェクト型は全てのプロパティがreadonlyになる。配列リテラルから推論されるタプル型も同様
	const bar = {
		foo: 123,
		bar: "abc",
	} as const;

	// 3. 文字列・数値・BigInt・真偽地リテラルに対してつけられるリテラル型がwindeningしないリテラル型になる
	// foo2の中身はstring[]ではなく["aaa", "abc"]というリテラル型になる
	const foo2 = ["aaa", "abc"] as const;

	// 4. テンプレート文字列リテラルの型がstirngではなくテンプレートリテラル型になる
	const prefix = "prefix";
	const hoge = `${prefix}foo` as const;

	// 基本的にas constが使用されている部分は変更できないものとして扱われる
}
