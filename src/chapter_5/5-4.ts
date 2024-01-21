// 5.4 this

// 5.4.1 関数の中のthisは呼び出し方によって決める
{
	class User {
		name: string;
		#age: number;

		constructor(name: string, age: number) {
			this.name = name;
			this.#age = age;
		}

		public isAdult(): boolean {
			return this.#age >= 20;
		}
	}

	// 複数のインスタンス間で関数オブジェクトは共有されるため経済的
	// この挙動は言語使用上はprototypeと呼ばれる
	const rorisu = new User("rorisu", 23);
	const peetan = new User("peetan", 3);
	console.log(rorisu.isAdult === peetan.isAdult); // 同じ関数オブジェクトを参照しているためtrue

	//const isAdult = rorisu.isAdult;
	//console.log(isAdult()); // thisがundefinedになるためランタイムエラーになる
}

// 5.4.2 アロー関数とthis
{
	class User {
		name: string;
		#age: number;

		constructor(name: string, age: number) {
			this.name = name;
			this.#age = age;
		}

		public isAdult(): boolean {
			return this.#age >= 20;
		}

		public filterOlder(users: readonly User[]): User[] {
			return users.filter((u) => u.#age > this.#age);
		}
	}

	const rorisu = new User("rorisu", 23);
	const peetan = new User("peetan", 3);
	const nuu = new User("nuu", 40);
	const older = rorisu.filterOlder([peetan, nuu]); // rorisuのfilterOlderメソッドを呼び出しているため、thisはrorisuを指す
	console.log(older); // [ User { name: 'nuu', #age: 40 } ]
}

// 5.4.3 thisを操作するメソッド
{
	class User {
		name: string;
		#age: number;

		constructor(name: string, age: number) {
			this.name = name;
			this.#age = age;
		}

		public isAdult(): boolean {
			return this.#age >= 20;
		}
	}

	const rorisu = new User("rorisu", 23);
	const pee = new User("pee", 3);

	console.log(rorisu.isAdult()); // true
	console.log(rorisu.isAdult.apply(pee, [])); // false　第一引数がthisとして呼び出される値で、第二引数以降が関数の引数として渡される値　　peeは3歳なのでfalseになる

	const boundIsAdult = rorisu.isAdult.bind(pee); // bindメソッドを使うとthisを束縛した関数オブジェクトを作成できる
	console.log(boundIsAdult()); // false
	console.log(boundIsAdult.call(rorisu)); // true
}
