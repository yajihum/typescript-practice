// 6.8 力試し

// 6.8.1 タグ付きユニオンの練習（１）
{
	type Option<T> =
		| {
				tag: "some";
				value: T;
		  }
		| {
				tag: "none";
		  };
	const option1: Option<number> = {
		tag: "some",
		value: 123,
	};

	const showNumberIfExists = (object: Option<number>) => {
		if (object.tag === "some") {
			console.log(object.value);
		}
	};
	console.log(showNumberIfExists(option1)); // => 123
	console.log(showNumberIfExists({ tag: "none" })); // => 何も表示されない
}

// 6.8.2 タグ付きユニオンの練習（２）
{
	type Option<T> =
		| {
				tag: "some";
				value: T;
		  }
		| {
				tag: "none";
		  };
	const option1: Option<number> = {
		tag: "some",
		value: 123,
	};

	const isSome = <T>(
		object: Option<T>,
	): object is Extract<Option<T>, { tag: "some" }> => {
		if (object.tag === "some") {
			return true;
		}
		return false;
	};

	const showNumberIfExists = (object: Option<number>) => {
		if (isSome(object)) {
			console.log(object.value);
		}
	};
}

// 6.8.5 タグ付きユニオンの練習（3）
{
	type Option<T> =
		| {
				tag: "some";
				value: T;
		  }
		| {
				tag: "none";
		  };

	const mapOption = <T, U>(
		obj: Option<T>,
		callback: (value: T) => U,
	): Option<U> => {
		switch (obj.tag) {
			case "some":
				return { tag: "some", value: callback(obj.value) };
			case "none":
				return { tag: "none" };
		}
	};
	const doubleOption = (obj: Option<number>) => {
		return mapOption(obj, (value) => value * 2);
	};

	const four: Option<number> = { tag: "some", value: 4 };
	console.log(doubleOption(four)); // => { tag: "some", value: 8 }

	const nothing: Option<number> = { tag: "none" };
	console.log(doubleOption(nothing)); // => { tag: "none" }
}
