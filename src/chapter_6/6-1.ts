// 6.1

// 6.1.2 伝播するユニオン型
{
	type Animal = {
		species: string;
		age: string;
	};
	type Human = {
		name: string;
		age: number;
	};
	type User = Animal | Human;

	const rorisu: User = {
		species: "リス",
		age: "23",
	};

	const shwAge = (user: User) => {
		const age = user.age; // ageはstring | number
		console.log(age);
	};
}

// 6.1.3 インターセクション型
{
	type Animal = {
		species: string;
		age: number;
	};
	type Human = Animal & {
		name: string;
	};

	const rorisu: Human = {
		species: "リス",
		age: 23,
		name: "rorisu",
	};
}

// 6.1.4 ユニオン型とインターセクション型の表裏一体な関係
{
	type Human = { name: string };
	type Animal = { species: string };
	const getName = (user: Human) => {
		return user.name;
	};
	const getSpcies = (user: Animal) => {
		return user.species;
	};

	const rorisu: Human = { name: "rorisu" };
	const mysteryFunc = Math.random() < 0.5 ? getName : getSpcies;
	//console.log(mysteryFunc(rorisu)); // エラー　　mysteryFuncはどの型の引数を受け取るかわからないから

	const peetan: Human & Animal = { name: "peetan", species: "リス" };
	console.log(mysteryFunc(peetan)); // Human&Animal型の引数はOK
}

// 6.1.6 オプショナルチェイニング
{
	type Human = {
		name: string;
		age: number;
	};

	const useMaybeHuman = (human: Human | undefined) => {
		const age = human?.age;
		console.log(age);
	};

	// 関数の場合
	type GetTimeFunc = () => Date;

	const useTime = (getTimeFunc: GetTimeFunc | undefined) => {
		const timeOrUndefined = getTimeFunc?.();
	};
}
