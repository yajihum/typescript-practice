// 6.6 any型とunknown型

// 6.6.3 anyに近いが安全なunkown型
{
	const doNothing = (value: unknown) => {
		//const name= val.name; // unknown型の値はプロパティにアクセスできない

		// unkown型を使う場合はs彫込みで使う
		if (typeof value === "string") {
			return value.toUpperCase();
		}
		console.log("value is not string");
	};
}
