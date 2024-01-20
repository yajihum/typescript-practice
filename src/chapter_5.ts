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
