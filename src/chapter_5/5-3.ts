// 5.3 クラスの継承

// ５.３.１
class PremiumUser extends User7 {
	rank = 1;
}
const pee = new PremiumUser("pee", 5);
console.log(pee.rank); // 1

// 5.3.2 親の機能を上書きする
class PremiumUser2 extends User7 {
	rank = 1;

	constructor(name: string, rank: number) {
		super(name, 100); // コンストラクターのオーバーライドはsuper()を呼び出す必要がある 親のコンストラクターの引数に何を用意するかは自由
		this.rank = rank;
	}

	// 親のメソッドを上書きする
	isAdult(): boolean {
		return true;
	}
}

console.log(new User7("rorisu", 5).isAdult()); // false
console.log(new PremiumUser2("rorisu", 2).isAdult()); // true

// 5.3.3 override修飾子
class PremiumUser3 extends User8 {
	rank = 1;

	// override修飾子を使って宇和がkしていることを明示できる
	public override isAdult(): boolean {
		return true;
	}
}

// 5.3.4 privateとprotectedの動作の使い所
{
	class User {
		name: string;
		//#age: number;
		protected age: number; // privateではなくprotectedにすることで、継承したクラスからはアクセスできるようになる

		constructor(name: string, age: number) {
			this.name = name;
			this.age = age;
		}

		public isAdult(): boolean {
			return this.age >= 20;
		}
	}

	class PremiumUser extends User {
		public isAdult(): boolean {
			return this.age >= 10; // 子のクラスからは親のprivateなプロパティにアクセスできないのでprivateではなくprotectedにする
		}
	}
}

// 5.3.5 implementsによるクラスの型チェック
{
	type HasName = { name: string };

	class User implements HasName {
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
}
