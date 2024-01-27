// 6.2 リテラル型

// 6.2.1 4種類のリテラル型
{
	// Biomeでエラーになるためコメントアウト
	//const foo: "foo" = "foo";
	//const bar: 123 = 123;
	//const bazz: true = true;
	//const three: 3n = 3n;
}

// 6.2.2 テンプレートリテラル型
{
	const getHelloStr = (): `Hello, ${string}!` => {
		return "Hello, TypeScript!";

		// 以下はダメ
		//return "Hello, TypeScript";
		//return "Hel, TypeScript!";
	};
}

// 6.2.4 リテラル型のwidening
{
	const rorisu1 = "rorisu"; // constで宣言すると型が"rorisu"になる
	let rorisu2 = "rorisu"; // letで宣言すると型がstringになる
	rorisu2 = "rorisu2";
	// letの場合は変数の型がリテラル型に推論されそうな場合はプリミティブ型に変換される

	// オブジェクト型の場合はwideningされる
	const rorisu = {
		name: "rorisu", // nameはstring型
		age: 23, // ageはnumber型
	};
}
