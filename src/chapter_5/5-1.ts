// 5
// クラス

// 5.1.1 クラスの宣言
class User2 {
	name = "";
	age = 0;

	isAdult(): boolean {
		return this.age >= 20;
	}

	setAge(age: number): void {
		this.age = age;
	}
}
const rorisu = new User2(); // このUser2はオブジェクトのように機能するので、クラスオブジェクトともいう
rorisu.name = "rorisu";
rorisu.age = 5;
console.log(rorisu); // User2 { name: 'rorisu', age: 5 }

console.log(rorisu.isAdult()); // false
rorisu.setAge(20);
console.log(rorisu.isAdult()); // true

// 5.1.4 コンストラクタ
class User3 {
	name: string;
	age: number;
	readonly id?: number = 0;

	constructor(name: string, age: number, id?: number) {
		this.name = name;
		this.age = age;
		this.id = id; // コンストラクタないではreadonlyにも代入できる
	}
}
const rorisu2 = new User3("rorisu", 5);
console.log(rorisu2); // User3 { name: 'rorisu', age: 5 }

// 5.1.5 静的プロパティと静的メソッド
class User4 {
	static adminName = "rorisu";
	static getAdminUser() {
		return new User4(User4.adminName, 20);
	}

	name: string;
	age: number;

	constructor(name: string, age: number) {
		this.name = name;
		this.age = age;
	}
}

console.log(User4.adminName); // rorisu
console.log(User4.getAdminUser()); // User4 { name: 'rorisu', age: 20 }
const peetan = new User4("peetan", 3);
console.log(peetan); // User4 { name: 'peetan', age: 3 }
//console.log(peetan.getAdminUser()); // エラー

// 5.1.6 アクセシビリティ修飾子
class User5 {
	private readonly id: number; // privateはクラスの外からアクセスできない
	public name: string;
	protected age: number; // protectedはクラスの外からアクセスできないが、継承したクラスからはアクセスできる

	constructor(id: number, name: string, age: number) {
		this.id = id;
		this.name = name;
		this.age = age;
	}
}
const rorisu3 = new User5(1, "rorisu", 5);
console.log(rorisu3.name); // rorisu
//console.log(rorisu3.id); // エラー
//console.log(rorisu3.age); // エラー

// 5.1.7 コンストラクタ引数でのプロパティ宣言
class User6 {
	constructor(
		private readonly id: number,
		public name: string, // publicでも宣言が必要
		protected age: number,
	) {}
}

// 5.1.8 クラス式でクラスを作成する
const User7 = class {
	name: string;
	age: number;

	constructor(name: string, age: number) {
		this.name = name;
		this.age = age;
	}

	isAdult(): boolean {
		return this.age >= 20;
	}
};
const rorisu4 = new User7("rorisu", 5);
console.log(rorisu4); // { name: 'rorisu', age: 5 }
// クラス式の中ではprivateやprotectedなプロパティは使用不可なので基本的にはクラス宣言を使う

// 5.1.9 #から始まるプライベートプロパティ
class User8 {
	name: string;
	#age: number;

	constructor(name: string, age: number) {
		this.name = name;
		this.#age = age;
	}

	isAdult(): boolean {
		return this.#age >= 20;
	}
}
const rorisu5 = new User8("rorisu", 5);
//console.log(rorisu5.age); // エラー
// #を使う場合はECMAScript独自の機能であるため、コンパイル後もprivateなものとして扱われるためより厳格なものになる

// 5.1.10 クラスの静的初期化ブロック
class User9 {
	static adminUser: User9;
	static {
		User9.adminUser = new User9();
		User9.adminUser.#age = 999;
	}

	#age = 0;
	getAge(): number {
		return this.#age;
	}
	setAge(age: number): void {
		this.#age = age;
	}
}
console.log(User9.adminUser); // User9 { #age: 999 } staticブロックであれば#ageを直接書き換えられる
// staticブロックはクラス宣言の一部として使えるためprivateなプロパティにもアクセスできる

// 5.1.11 型引数を持つクラス
class User10<T> {
	name: string;
	#age: number;
	readonly data: T;

	constructor(name: string, age: number, data: T) {
		this.name = name;
		this.#age = age;
		this.data = data;
	}
}
const rorisu6 = new User10<string>("rorisu", 5, "hello");
const rorisu7 = new User10("rorisu", 5, { id: 1 }); // 型推論もしてくれる
